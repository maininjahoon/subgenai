import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import cors from "cors";
import {
  validateSigninRequest,
  validateSignupRequest,
  validateUpdateNameRequest,
  validateUpdatePasswordRequest,
  validAuth,
} from "./middlewares/validateRequest.js";
import {
  deleteFile,
  generateVideoUploadSignature,
  uploadSubtile,
} from "./services/cloudinary.service.js";
import { env } from "./config/env.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client.js";
import { DeepgramClient } from "@deepgram/sdk";
import { srt, webvtt } from "@deepgram/captions";
import fs from "fs";
import type { MediaTranscribeResponse } from "@deepgram/sdk/listen/v1";
import { DeepgramError } from "@deepgram/sdk";
import generateSubtitleSchema from "./zodSchema/generateSubtitle.js";
import z, { ZodError } from "zod";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdPublic,
  updateUserName,
  updateUserPassword,
} from "./db/user.repository.js";
import {
  createSubtitle,
  deleteSubtitleById,
  findRecentSubtitlesByUserId,
  findSubtitlesByUserId,
  findTotalSubtitleByUserId,
  getStats,
  updateSubtitleStatus,
} from "./db/subtitle.repository.js";
import getSubtitlesSchema from "./zodSchema/getSubtitlesSchema.js";
import { isPrismaError } from "./utils/isPrismaError.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

const sessionSecret = env.SESSION_SECRET;

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "lax",
    },
  }),
);

// me route
app.get("/me", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized. Please log in.",
    });
  }
  try {
    const user = await findUserByIdPublic(userId);

    if (!user) {
      req.session.destroy((error) => {
        if (error) {
          console.error("GET /me - session destruction error:", error);
        }
      });

      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("GET /me - database error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// sign up route
app.post("/signup", validateSignupRequest, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser)
      return res.status(409).json({ message: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(name, email, hashedPassword);

    req.session.userId = user.id;

    return res.status(201).json({
      message: "User created",
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(409).json({
        message: "Email already in use.",
      });
    } else if (isPrismaError(err)) {
      console.error("Signup Prisma error:", err.message);
    } else console.error("Signup unexpected error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// signin route
app.post("/signin", validateSigninRequest, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    req.session.userId = user.id;

    return res.status(200).json({ message: "User signed in" });
  } catch (error: unknown) {
    if (isPrismaError(error)) {
      console.error("Signin Prisma error:", error);
    } else {
      console.error("Signin unexpected error:", error);
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// update password route
app.patch(
  "/update-password",
  validateUpdatePasswordRequest,
  async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.session.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const user = await findUserById(userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      const isPasswordvalid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordvalid)
        return res.status(401).json({ message: "Invalid current password" });

      const isNewPasswordSame = await bcrypt.compare(
        newPassword,
        user.password,
      );

      if (isNewPasswordSame)
        return res.status(400).json({
          message: "New password cannot be the same as the current password",
        });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await updateUserPassword(userId, hashedPassword);

      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy session:", err);
          return res.status(500).json({
            message: "Password changed, but failed to log out session",
          });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
          message: "Password changed successfully",
        });
      });
    } catch (err: unknown) {
      if (isPrismaError(err)) {
        console.error("Update password Prisma error:", err.message);
      } else {
        console.error("Update password unexpected error:", err);
      }
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);

// update name route
app.patch("/update-name", validateUpdateNameRequest, async (req, res) => {
  const { name, password } = req.body;
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordvalid = await bcrypt.compare(password, user.password);

    if (!isPasswordvalid)
      return res.status(401).json({ message: "Invalid current password" });

    await updateUserName(userId, name);

    return res.status(200).json({ message: "Name updated successfully" });
  } catch (err: unknown) {
    if (isPrismaError(err)) {
      console.error("Update name Prisma error:", err.message);
    } else {
      console.error("Update name unexpected error:", err);
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// logout route
app.post("/logout", validAuth, (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout session destruction error:", error);

      return res.status(500).json({
        message: "Logout failed. Please try again.",
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Logout successful.",
    });
  });
});

// get subtitles route
app.get("/subtitles", validAuth, async (req, res) => {
  const userId = req.session.userId;

  if (userId === undefined)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await findUserById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const parsedData = getSubtitlesSchema.parse(req.query);

    const { format, search, page } = parsedData;

    const subtitles = await findSubtitlesByUserId(userId, page, format, search);

    const totalSubtitles = await findTotalSubtitleByUserId(
      userId,
      format,
      search,
    );

    return res.status(200).json({
      subtitles,
      totalSubtitles,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      console.warn("Subtitles query validation error:", err.flatten());

      return res.status(400).json({
        message: "Invalid query parameters",
        errors: err.flatten().fieldErrors,
      });
    }

    if (isPrismaError(err)) console.error("Get subtitles Prisma error:", err);
    else console.error("Get subtitles unexpected error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// get recent subtitles route
app.get("/recent-subtitles", validAuth, async (req, res) => {
  const userId = req.session.userId;

  if (userId === undefined)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const subtitles = await findRecentSubtitlesByUserId(userId);

    return res.status(200).json({
      subtitles,
    });
  } catch (error: unknown) {
    if (isPrismaError(error))
      console.error("Get recent subtitles Prisma error:", error);
    else console.error("Get recent subtitles unexpected error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// cloudinary upload signature route
app.get("/cloudinary/upload-signature", validAuth, (req, res) => {
  try {
    const { timestamp, signature, folder } = generateVideoUploadSignature();

    return res.status(200).json({
      timestamp,
      signature,
      folder,
      apiKey: env.CLOUDINARY_API_KEY,
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error: unknown) {
    console.error("Cloudinary signature generation error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// generate subtitle route
app.post("/generate-subtitle", validAuth, async (req, res) => {
  const deepgram = new DeepgramClient({ apiKey: env.DEEPGRAM_API_KEY });

  let public_id: string | undefined;
  let filename: string | undefined;
  let subtitleId: number | undefined;
  const userId = req.session.userId as number;
  try {
    const parsedData = generateSubtitleSchema.parse(req.body);

    public_id = parsedData.public_id;

    const { url, captionFormat, subtitleName } = parsedData;

    const subtitle = await createSubtitle(userId, subtitleName, captionFormat);

    subtitleId = subtitle.id;

    const result: MediaTranscribeResponse =
      await deepgram.listen.v1.media.transcribeUrl({
        url: url,
        model: "nova-3",
        smart_format: true,
        utterances: true,
      });

    if (!("results" in result)) {
      return res.status(502).json({
        message: "Deepgram did not return a transcription result.",
      });
    }

    const { utterances } = result.results;
    if (utterances === undefined || utterances.length === 0) {
      return res.status(422).json({
        message: "No speech was detected in the uploaded file.",
      });
    }

    const captions = captionFormat === "srt" ? srt(result) : webvtt(result);

    filename = `${subtitleName}.${captionFormat}`;

    fs.writeFileSync(filename, captions);

    const uploadResult = await uploadSubtile(filename);

    const downloadUrl = uploadResult.secure_url.replace(
      "/upload/",
      "/upload/fl_attachment/",
    );

    await updateSubtitleStatus(subtitleId, {
      status: "COMPLETED",
      url: downloadUrl,
    });

    return res.status(200).json({
      downloadUrl: downloadUrl,
    });
  } catch (err: unknown) {
    if (subtitleId !== undefined) {
      try {
        await updateSubtitleStatus(subtitleId, {
          status: "FAILED",
        });
      } catch (cleanupError) {
        console.error("Failed to mark subtitle as FAILED:", cleanupError);
      }
    }

    if (err instanceof ZodError) {
      console.error("Generate subtitle validation error:", err.issues);

      return res.status(400).json({
        message: "Invalid request payload.",
        errors: err.issues,
      });
    }

    if (err instanceof DeepgramError) {
      console.error("Generate subtitle Deepgram error:", err);

      return res.status(502).json({
        message:
          "Unable to transcribe your media right now. Please try again later.",
      });
    }

    if (isPrismaError(err))
      console.error("Generate subtitle Prisma error:", err);
    else console.error("Generate subtitle unexpected error:", err);

    return res.status(500).json({
      message: "Internal server error.",
    });
  } finally {
    if (public_id) {
      try {
        const response = await deleteFile(public_id);

        if (response.result !== "ok") {
          console.error(
            `Failed to delete file from Cloudinary: ${response.message}`,
          );
        }
      } catch (err) {
        console.error("Error while deleting media file:", err);
      }
    }

    if (filename) {
      try {
        await fs.promises.unlink(filename);
      } catch (err) {
        console.error("Error while deleting local subtitle file:", err);
      }
    }
  }
});

// dashboard stats route
app.get("/dashboard-stats", async (req, res) => {
  const userId = req.session.userId;

  if (userId === undefined) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const result = await getStats(userId);

    res.json(result);
  } catch (err) {
    if (isPrismaError(err)) console.error("Dashboard stats Prisma error:", err);
    else console.error("Dashboard stats unexpected error:", err);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
});

//delete subtitles route
app.delete("/subtitle/:id", validAuth, async (req, res) => {
  const id = Number(req.params.id);

  const userId = req.session.userId;

  if (userId === undefined) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const result = await deleteSubtitleById(id, userId);

    if (result.count === 0) {
      return res.status(404).json({
        message: "Subtitle not found",
      });
    }

    return res.status(200).json({
      message: "Subtitle deleted successfully",
    });
  } catch (error: unknown) {
    if (isPrismaError(error))
      console.error("Delete subtitle Prisma error:", error);
    else console.error("Delete subtitle unexpected error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
});

// health route
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port http://localhost:${env.PORT}`);
});
