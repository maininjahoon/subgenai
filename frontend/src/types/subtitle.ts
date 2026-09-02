export type Subtitle = {
  id: number;
  title: string;
  format: "srt" | "vtt";
  createdAt: string;
  url: string;
};

export type GetSubtitlesResponse = {
  subtitles: Subtitle[];
  totalSubtitles: number;
};

export type GetRecentSubtitlesResponse = {
  subtitles: Subtitle[];
};
