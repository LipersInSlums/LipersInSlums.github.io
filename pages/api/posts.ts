import { join, parse } from "path";
import fs from "node:fs/promises";
import { NextApiHandler } from "next";
import matter from "gray-matter";
import parseMatter from "src/util/parseMatter";

const postsDirectory = join(process.cwd(), "_posts");

export async function getAllPosts() {
  const fileNames = await fs.readdir(postsDirectory);

  const files = await Promise.all(
    fileNames.map((name) => fs.readFile(join(postsDirectory, name), "utf-8")),
  );
  const metaData = files.map((file) => matter(file));

  return (
    metaData
      .map((data, index) => ({
        path: parse(fileNames[index]).name,
        ...parseMatter(data),
      }))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  );
}

export type Post = Awaited<ReturnType<typeof getAllPosts>>[0];
export type PostsResult = Awaited<Post[]>;

const handler: NextApiHandler = async (_req, res) => {
  const contents = await getAllPosts();
  res.json(contents);
};

export default handler;
