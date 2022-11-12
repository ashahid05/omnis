"use client";

import useUser from "@app/user";

export default function Page() {
  const { user, loading, loggedOut, mutate } = useUser();

  if (loading) return;

  if (loggedOut) {
    return <div>Unauthenticated</div>;
  }

  return (
    <div>
      <p>Name: {user?.name}</p>
    </div>
  );
}
