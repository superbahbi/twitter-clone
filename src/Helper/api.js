import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
instance.interceptors.request.use(
  async (config) => {
    console.log(config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
