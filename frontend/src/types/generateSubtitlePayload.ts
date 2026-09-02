export type GenerateSubtitlePayload = {
  url: string;
  captionFormat: "srt" | "vtt";
  subtitleName: string;
  public_id: string;
};
