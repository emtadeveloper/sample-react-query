import { useQuery } from "react-query";
import { getUsers } from "../services/apiClient";

const QUERY_KEY = ["User"];

const fetchUser = async (activePage) => {
  const { data } = await getUsers(`users?page=${activePage}`);
  return data;
};

export const useGeAllUser = (activePage) => {
  return useQuery([QUERY_KEY, activePage], () => fetchUser(activePage));
};
