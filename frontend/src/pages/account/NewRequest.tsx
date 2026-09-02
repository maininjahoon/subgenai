import { uploadFileToCloudinary } from "@/api/cloudinary";
import { generateSubtitles } from "@/api/subtitles";
import { getUploadSignature } from "@/api/uploadSignature";
import Button from "@/components/Button";
import ProgressPanel from "@/components/newRequest/ProgressPanel";
import MediaUpload from "@/components/newRequest/MediaUpload";
import SubtitleConfiguration from "@/components/newRequest/SubtitleConfiguration";
import GenerationError from "@/components/newRequest/GenerationError";
import GenerationSuccess from "@/components/newRequest/GenerationSuccess";
import type { GenerateSubtitlePayload } from "@/types/generateSubtitlePayload";
import type { ProcessingStage } from "@/types/processingStage";
import { backendSignatureSchema } from "@/zodSchema";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export default function NewRequest() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileFormat, setFileFormat] = useState<"srt" | "vtt">("srt");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [processingStage, setProcessingStage] =
    useState<ProcessingStage>("idle");

  const [processingError, setProcessingError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    const size = inputFile?.size || 0;

    if (size > 100 * 1024 * 1024) {
      setDownloadUrl(null);
      setFileName("");
      setFile(null);

      setError(
        "File size exceeds the maximum limit of 100 MB. \n Tip: Consider compressing the file, or extracting and sending the audio file separately.",
      );

      return;
    }

    setFileName(inputFile?.name || "");
    setDownloadUrl(null);
    setError(null);

    if (!inputFile) return;

    setFile(inputFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setDownloadUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setError(null);

    try {
      setIsProcessing(true);
      setProcessingStage("preparing");

      await new Promise((resolve) => setTimeout(resolve, 800));

      const jsonSignatureResponse = await getUploadSignature();

      const signatureValidationResult = backendSignatureSchema.safeParse(
        jsonSignatureResponse,
      );

      if (!signatureValidationResult.success) {
        throw new Error("Backend returned a malformed signature payload.");
      }

      const signatureData = signatureValidationResult.data;

      const { apiKey, cloudName, folder, signature, timestamp } = signatureData;

      const formData = new FormData();

      formData.append("file", file);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", folder);
      formData.append("api_key", apiKey);

      setProcessingStage("processing");

      const jsonCloudinaryData = await uploadFileToCloudinary(
        formData,
        cloudName,
      );

      const { secure_url, public_id } = jsonCloudinaryData;

      const payload: GenerateSubtitlePayload = {
        captionFormat: fileFormat,
        subtitleName: fileName,
        url: secure_url,
        public_id,
      };

      setProcessingStage("generating");

      const { downloadUrl } = await generateSubtitles(payload);

      setProcessingStage("finishing");

      await new Promise((resolve) => setTimeout(resolve, 800));

      setDownloadUrl(downloadUrl);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["subtitles"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["recent-subtitles"],
        }),
      ]);

      setProcessingStage("completed");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";

      setProcessingError(message);
      setProcessingStage("failed");
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewRequest = () => {
    setProcessingStage("idle");
    setProcessingError(null);
    setDownloadUrl(null);
    setFile(null);
    setFileName("");
    setError(null);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 py-5 pb-24 sm:px-6 sm:py-7 md:pb-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Page header */}
          <div className="border-b border-border px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-sm font-medium text-brand">Create</p>

            <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              New Subtitle Request
            </h1>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">
              Upload your media and generate subtitles in your preferred format.
            </p>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <MediaUpload
              file={file}
              isProcessing={isProcessing}
              onFileChange={handleFileChange}
              onRemove={handleRemoveFile}
            />

            <SubtitleConfiguration
              fileName={fileName}
              fileFormat={fileFormat}
              isProcessing={isProcessing}
              onFileNameChange={setFileName}
              onFileFormatChange={setFileFormat}
            />

            {error && <GenerationError error={error} />}

            <Button
              type="button"
              onClick={handleUpload}
              disabled={!file || isProcessing}
              className="h-11 w-full"
            >
              {isProcessing ? "Generating subtitles..." : "Generate Subtitles"}
            </Button>

            {downloadUrl && <GenerationSuccess downloadUrl={downloadUrl} />}
          </div>
        </div>
      </div>

      {(isProcessing ||
        processingStage === "completed" ||
        processingStage === "failed") && (
        <ProgressPanel
          processingStage={processingStage}
          downloadUrl={downloadUrl}
          error={processingError}
          onNewRequest={handleNewRequest}
          onRetry={handleUpload}
        />
      )}
    </>
  );
}
