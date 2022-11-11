import { Todo } from "#types";
import Link from "next/link";

async function fetchTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos: Todo[] = await res.json();
  return todos;
}

async function TodosList() {
  const todos = await fetchTodos();
  return (
    <div>
      {todos.map((todo) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </div>
  );
}

export default TodosList;
