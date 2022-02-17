import { Post } from "../../model/Post";
import Link from "next/link";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

function PostCard({ title, excerpt, slug }: Post) {
  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          component="div"
        >
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          read
        </Link>
      </CardActions>
    </Card>
  );
}

type Props = {
  readonly posts: Post[];
};

const BlogPosts = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </>
  );
};

export default BlogPosts;
