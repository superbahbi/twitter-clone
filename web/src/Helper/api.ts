import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
instance.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    const token = localStorage.getItem("token");
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    if (token) {
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
