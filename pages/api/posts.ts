import { join, parse } from "path";
import { NextApiHandler } from "next";
import fs from "node:fs/promises";
import matter from "gray-matter";
import fetchApi from "@/lib/apiClient";
import parseMatter from "src/util/parseMatter";

const postsDirectory = join(process.cwd(), "_posts");

async function getAllPosts() {
  const fileNames = await fs.readdir(postsDirectory);

  const files = await Promise.all(
    fileNames.map((name) => fs.readFile(join(postsDirectory, name), "utf-8"))
  );
  const metaData = files.map((content) => matter(content));

  return metaData.map((data, index) => ({
    path: parse(fileNames[index]).name,
    ...parseMatter(data),
  }));
}

export type Post = Awaited<ReturnType<typeof getAllPosts>>[0];
export type PostsResult = Awaited<Post[]>;
export async function fetchAllPosts(): Promise<PostsResult> {
  return await fetchApi("posts");
}

const handler: NextApiHandler = async (_req, res) => {
  const contents = await getAllPosts();
  res.json(contents);
};

export default handler;
