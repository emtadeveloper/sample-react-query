import { useQuery } from "react-query";
import { getUsers } from "../services/apiClient";

const QUERY_KEY = ["User"];

const fetchUser = async (params) => {
  const { data } = await getUsers(`users/${params.userId}`);
  return data;
};

export const useGetUser = (params) => {
  return useQuery(QUERY_KEY, () => fetchUser(params));
};
