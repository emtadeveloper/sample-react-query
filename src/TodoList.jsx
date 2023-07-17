import { useQuery } from "react-query";

export const TodoList = () => {
  const { data, isLoading, isError } = useQuery("todos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    return data;
  });

  if (isLoading) return <div>Loading ....</div>;

  if (isError) return <div> we have Error ....</div>;

  return (
    <div>
      <ul>
        {data.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </div>
  );
};
