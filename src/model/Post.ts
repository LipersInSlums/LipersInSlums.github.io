export type RawPost = Partial<{
  slug: string;
  title: string;
  date: string;
  author: Author;
  excerpt: string;
  content: string;
  show_index?: boolean;
}>;

export interface Author {
  name: string;
}
