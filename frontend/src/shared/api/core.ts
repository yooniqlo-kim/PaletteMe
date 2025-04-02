import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const tempToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MSwiaWQiOiJsaGoiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzQzNTUzNzU3LCJleHAiOjE3NDQ0MTc3NTd9.kwVnNYutiCgvUM-NCmWSu2qfMot73UcG8msZsvY8qYQ";

  if (config.headers) {
    config.headers.Authorization = `${tempToken}`;
  }

  return config;
});
