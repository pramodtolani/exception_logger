import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const sendRequest = async ({ method, url, body }) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
  }
};
