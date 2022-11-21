import { Post } from "#types";
import PostCard from "@app/(app)/posts/PostCard";
import ArticleImage from "public/images/article-image.jpg";
import DummyImage from "public/images/dummy-pfp.jpeg";

async function fetchPosts() {
  const res = await fetch(`http://localhost:3001/posts`);
  const posts: Post[] = await res.json();

  return posts;
}

async function PostsList() {
  let posts = await fetchPosts();

  return (
    <div className="grid gap-8 grid-cols-1 sm:max-w-full sm:grid-cols-2 lg:max-w-full xl:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard
          author={{
            name: post.author.name,
            image: DummyImage,
          }}
          key={index}
          title={post.title}
          description={post.content}
          rating={post.rating ?? "No rating"}
          image={`${process.env.NEXT_PUBLIC_STORAGE}/posts/${post.image}`}
          link={`/posts/${post.id}`}
          date={post.created_at}
        />
      ))}
    </div>
  );
}

export default PostsList;
