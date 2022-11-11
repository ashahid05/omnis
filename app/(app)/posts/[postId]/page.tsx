import { Post } from "#types";
import { notFound } from "next/navigation";
import PostUI from "./Post";

export const dynamicParams = true;

type PageProps = {
  params: {
    postId: string;
  };
};

async function fetchPost(postId: string) {
  const res = await fetch(`http://localhost:3001/posts/${postId}`, {
    next: { revalidate: 60 },
  });
  const post: Post = await res.json();

  return post;
}

export default async function PostPage(props: PageProps) {
  const post = await fetchPost(props.params.postId);
  if (!post?.id) return notFound();

  return <PostUI {...post} />;
}

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3001/posts");

  const posts: Post[] = await res.json();

  return posts.map((post) => ({ postId: post.id.toString() }));
}
