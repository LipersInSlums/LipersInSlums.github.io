import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import { RawPost, Post, parsePostSchema } from "@/model/Post";
import parseHeadings from "@/lib/parseHeadings";
type MarkdownDir = "_posts" | "_channels";

export function getFiles(dir: MarkdownDir): string[] {
  return fs.readdirSync(dir);
}

export function getPostSlugs(): string[] {
  return getFiles("_posts");
}

function parsePost(slugPath: `_posts/${string}`): RawPost {
  const realSlug = slugPath.replace(/\.md$/, "");
  const fullPath = path.resolve(slugPath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  const headings = parseHeadings(content);

  return {
    content,
    headings,
    slug: realSlug,
    parsed: parsePostSchema.parse(data),
  };
}

export function getPostBySlug(slug: string): Post {
  const { parsed, ...data } = parsePost(`_posts/${slug}`);

  return { ...parsed, ...data };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
