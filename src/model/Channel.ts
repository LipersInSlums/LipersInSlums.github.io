import { z } from "zod";

export type ChannelInfo = {
  notes: string[];
  name: string;
  topic: string;
  description: string;
  since: string;
  ignoreList?: boolean;
  order: number;
  realPath: string;
  refs: {
    name: string;
    href: string;
  }[];
};

export const parseChannelSchema = z.object({
  name: z.string().optional(),
  order: z.number(),
  topic: z.string(),
  description: z.string().catch("").default(""),
  since: z.string(),
  ignore_list: z.boolean().optional(),
  refs: z
    .array(
      z.object({
        name: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
});

export type ParsedChannel = z.infer<typeof parseChannelSchema>;
