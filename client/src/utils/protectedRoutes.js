import { backendConnection } from "./axiosConnection";
import Cookies from "js-cookie";

const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
};

export const getMethods = async (path) => {
  try {
    const res = await backendConnection.get(path, config);
    return res;
  } catch (error) {
    return error;
  }
};

export const postMethods = async (path, reqBody) => {
  try {
    const res = await backendConnection.post(path, reqBody, config);
    return res;
  } catch (error) {
    return error;
  }
};
