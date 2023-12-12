export type Heading = {
  content: string;
  level: number;
};

export default function parseHeadings(content: string): Heading[] {
  const headings = content.match(/^#{1,6} .+$/gm);
  if (!headings) return [];
  return headings.map((heading) => ({
    level: heading.split("#").length - 1,
    content: heading.replace(/^#{1,6} /, ""),
  }));
}
