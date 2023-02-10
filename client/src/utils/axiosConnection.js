import axios from "axios";

export const backendConnection = axios.create({
  baseURL: "https://navy-blue-panther-sari.cyclic.app/api",
  // baseURL: "http://localhost:8000/api",
});
