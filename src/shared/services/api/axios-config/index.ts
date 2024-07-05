import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const api = axios.create({
  baseURL: "http://localhosst:33333",
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { api };
