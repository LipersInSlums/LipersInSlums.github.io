import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import { RawPost, Post, parsePostSchema } from "@/model/Post";
import parseHeadings from "@/lib/parseHeadings";
type MarkdownDir = "_posts" | "_channels";

type MarkDownBaseName = `${string}.md`;

type MarkDownPath<Dir extends MarkdownDir> = `${Dir}/${MarkDownBaseName}`;

export function getFiles(dir: MarkdownDir): MarkDownBaseName[] {
  return fs.readdirSync(dir) as MarkDownBaseName[];
}

export function getPostSlugs(): MarkDownBaseName[] {
  return getFiles("_posts");
}

function parsePost(slugPath: MarkDownPath<"_posts">): RawPost {
  const realSlug = (slugPath.split("/").pop() ?? "").replace(/\.md$/, "");
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

export function getPostBySlug(slug: MarkDownBaseName): Post {
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
