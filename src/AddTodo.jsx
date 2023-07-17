import { useMutation, useQueryClient } from "react-query";

export default function AddTodo() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (newTodo) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
      onSettled: (data, error, variable, context) => {
        if (error) {
          queryClient.setQueryData(
            "todos",
            queryClient.setQueryData("todos", (oldTodos) => {
              return oldTodos.filter(
                (todo) => todo.id !== context.optimisticId
              );
            })
          );
        }
      },
      optimisticUpdate: (newTodo) => {
        const optimisticId = Date.now().toString();
        queryClient.setQueryData("todos", (oldTodos) => [
          ...oldTodos,
          {
            ...newTodo,
            id: optimisticId,
            userId: 1,
            completed: false,
          },
        ]);
        return { optimisticId };
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(
      {
        title: event.target.elements.title.value,
        completed: false,
      },
      {
        optimisticId: Date.now().toString(),
      }
    );
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      sdsad
      <input type="text" name="title" placeholder="new Todos" />
      <button type="submit" disabled={isLoading}>
        Add
      </button>
    </form>
  );
}
