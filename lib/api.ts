import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { RawPost, Post, parsePostSchema } from "@/model/Post";
import parseHeadings from "@/lib/parseHeadings";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

function parsePost(slug: string): RawPost {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
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
  const { parsed, ...data } = parsePost(slug);

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
