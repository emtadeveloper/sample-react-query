// import axios from "axios";

import axios from "axios";

// const URL_BASE = "https://reqres.in/api";
// axios.defaults.baseURL = URL_BASE;

// export const getUsers = async (param) => {
//   return await axios.get(`${URL_BASE}/${param}`);
// };

const apiRequest = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    auth: "Bearer Token",
  },
  params: {
    // code  پارامتره ایی که میخایم با هر درخواست ارسال بشه
  },
});

apiRequest.interceptors.request.use(
  (config) => {
    console.log(config, "config");
    return config;
    // return config;    همیشه باید بیایم و این کار بکنیم تا به سمت سرور امون ارسال بشه
  },
  (err) => {
    console.log("Err", err);
    return Promise.reject(err);
  }
);

apiRequest.interceptors.response.use(
  (response) => {
    console.log(response, "Success");
    return response;
    // return config;    همیشه باید بیایم و این کار بکنیم تا به سمت سرور امون ارسال بشه
  },
  (err) => {
    console.log("Err", err);
    return Promise.reject(err);
  }
);

export default apiRequest;
