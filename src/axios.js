import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

//Говорит, что при каждом запросе проверять есть ли токен в localStorage

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
