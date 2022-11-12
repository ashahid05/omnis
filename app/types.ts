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

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  created_at: Date;
  updated_at: Date;
};
