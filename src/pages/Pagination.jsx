import { useState } from "react";
import { useGeAllUser } from "../hooks/useGetAllUser";

export default function Pagination() {
  const [activePage, setActivePage] = useState(1);
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGeAllUser(activePage);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError) {
    return <div>Error fetching user</div>;
  }

  const handlePreviesPage = () => {
    setActivePage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setActivePage((prev) => prev + 1);
  };

  console.log(user, "user");

  return (
    <div className="grid">
      {user.data?.map((user) => (
        <p key={user?.id}>
          {user?.first_name}/ {user?.last_name}
        </p>
      ))}
      <div>
        <button onClick={handlePreviesPage}>previes</button>
        <button onClick={handleNextPage}>next</button>
      </div>
    </div>
  );
}
