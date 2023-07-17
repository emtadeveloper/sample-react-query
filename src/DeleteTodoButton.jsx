import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";

export function DeleteTodoButton({ todo }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async () => {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  console.log(todo, "todo");
  const handleClick = () => {
    mutate();
  };
  return (
    <li key={todo.id}>
      <p>{todo.title}</p>
      <button onClick={handleClick}>Delete</button>
    </li>
  );
}

DeleteTodoButton.propTypes = {
  todo: PropTypes.object,
};
