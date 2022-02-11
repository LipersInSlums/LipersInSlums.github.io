export interface Post {
  slug: string;
  title: string;
  date: string;
  author: Author;
  excerpt: string;
  content: string;
}

export interface Author {
  name: string;
}
