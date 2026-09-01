import z from "zod";

const generateSubtitleSchema = z.object({
  url: z.url(),
  captionFormat: z.enum(["srt", "vtt"]),
  subtitleName: z.string().min(1),
  public_id: z.string().min(1),
});

export default generateSubtitleSchema;
