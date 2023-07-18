import axios from "axios";

const URL_BASE = "https://reqres.in/api";
axios.defaults.baseURL = URL_BASE;

export const getUsers = async (param) => {
  return await axios.get(`${URL_BASE}/${param}`);
};
