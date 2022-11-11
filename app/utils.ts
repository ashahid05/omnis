namespace Utils {
  export function concat(...items: (string | number | boolean | undefined)[]) {
    return [...items].join(" ").trim();
  }
}

export default Utils;
export type Navigation = {
  path: string;
  title: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export type Post = {
  author_id: number;
  author: {
    name: string;
  };
  id: number;
  title: string;
  content: string;
  rating?: string;
  created_at: Date;
};
