import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

type GetPostSlugs = () => string[];
export const getPostSlugs: GetPostSlugs = () => {
  return fs.readdirSync(postsDirectory);
};

type Post = {
  [key: string]: string;
};
type GetPostBySlug = (slug: string, fields: string[]) => Post;
export const getPostBySlug: GetPostBySlug = (slug, fields = []) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  const post: Post = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      post[field] = realSlug;
    }
    if (field === "content") {
      post[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      post[field] = data[field];
    }
  });

  return post;
};

type GetAllPosts = (field: string[]) => Post[];
export const getAllPosts: GetAllPosts = (fields = []) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
