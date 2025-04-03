import axios from "axios";

export const api = axios.create({
  baseURL: "http://70.12.246.87:8080/api",
  withCredentials: true,
});
// 윤 "http://70.12.246.87:8080/api"
// 학준 "http://70.12.246.134:8080/api",

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (config.headers) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});
