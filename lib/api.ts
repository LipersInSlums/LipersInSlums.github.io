import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { RawPost } from "@/model/Post";
import { ArrayToEnum, ExcludesUndefined } from "src/util/types";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

function parsePost(slug: string): RawPost {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  return { ...data, slug: realSlug, content };
}

export function getPostBySlug<const Fields extends Array<keyof RawPost>>(
  slug: string,
  fields: Fields,
): Pick<ExcludesUndefined<RawPost>, ArrayToEnum<Fields>> {
  const post = parsePost(slug);

  const pickedPost = fields
    .filter((field) => post[field] != null && typeof post[field] === "string")
    .reduce<Record<string, string>>(
      (acc, curr) => ({ ...acc, [curr as string]: post[curr] as string }),
      {},
    );

  return pickedPost as Pick<
    ExcludesUndefined<RawPost>,
    ArrayToEnum<typeof fields>
  >;
}

export type Post<Fields extends Array<keyof RawPost>> = ReturnType<
  typeof getPostBySlug<Fields>
>;

export function getAllPosts(
  fields: Array<keyof RawPost> = [],
): Post<typeof fields>[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
