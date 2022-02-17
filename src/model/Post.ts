export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly author: Author;
  readonly excerpt: string;
  readonly content: string;
}

export interface Author {
  readonly name: string;
}
