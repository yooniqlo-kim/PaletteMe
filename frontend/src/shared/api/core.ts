import axios from "axios";

export const api = axios.create({
  baseURL: "http://70.12.247.36:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (config.headers) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});
