import * as z from "zod";
import { Heading } from "@/lib/parseHeadings";

export const parsePostSchema = z.object({
  title: z.string(),
  date: z.string(),
  author: z.object({
    name: z.string(),
  }),
  excerpt: z.string(),
  show_index: z.boolean().optional(),
});

export type RawPost = {
  slug: string;
  headings: Heading[];
  content: string;

  parsed: z.infer<typeof parsePostSchema>;
};

export type Post = {
  slug: string;
  headings: Heading[];
  content: string;
  title: string;
  date: string;
  author: Author;
  excerpt: string;
  show_index?: boolean;
};

export interface Author {
  name: string;
}
