import { User } from "./types";

namespace Utils {
  export function concat(...items: (string | number | boolean | undefined)[]) {
    return [...items].join(" ").trim();
  }

  export async function createPost(
    title: string,
    content: string,
    image: File,
    rating: string
  ) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/create`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          rating,
          image,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    console.log(res);

    return data;
  }

  export async function fetchUser(): Promise<User | null | undefined> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/@me`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    const error = !res.ok ? data.error ?? data : undefined;

    if (error) {
      throw error;
    }

    return data;
  }

  export async function logUserOut(): Promise<boolean | Error> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const success = res.status === 204;
    if (!success) {
      const data = await res.json();

      const error = !res.ok ? data.error ?? data : undefined;
      if (error) throw error;
    }

    return success;
  }
}

export default Utils;
