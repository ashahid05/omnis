import { User } from "./types";

namespace Utils {
  export function concat(...items: (string | number | boolean | undefined)[]) {
    return [...items].join(" ").trim();
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
}

export default Utils;
