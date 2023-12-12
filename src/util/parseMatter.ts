import { GrayMatterFile } from "gray-matter";

export type GrayMetaData = {
  title: string;
  excerpt: string;
  date: string;
  content: string;
  author: {
    name: string;
  };
};

export default function parseMatter(
  matter: GrayMatterFile<string>,
): GrayMetaData {
  return {
    title: matter.data["title"],
    excerpt: matter.data["excerpt"],
    date: matter.data["date"],
    author: matter.data["author"],
    content: matter.content,
  };
}
