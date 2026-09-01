import { z } from "zod";

const getSubtitlesSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  format: z.enum(["srt", "vtt"]).optional(),
  search: z.string().optional(),
});

export default getSubtitlesSchema;
