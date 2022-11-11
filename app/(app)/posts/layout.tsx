function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div>{children}</div>
    </div>
  );
}

export default PostsLayout;
