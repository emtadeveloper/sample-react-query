import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const TodoList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);
  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery(
    "todos",
    async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      return data;
    },
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  React.useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["projects", page + 1], async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        return data;
      });
    }
  }, [data, page, queryClient]);

  if (isLoading) return <div>Loading ....</div>;

  if (isError) return <div> we have Error ....</div>;

  return (
    <div>
      <ul>
        {data.map((todo) => {
          return (
            <li key={todo.id}>
              <p>{todo.title}</p>
            </li>
          );
        })}
      </ul>
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};
