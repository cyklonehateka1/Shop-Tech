import axios from "axios";

export const backendConnection = axios.create({
  baseURL: "http://localhost:8000/api",
});
