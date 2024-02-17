import axios from "axios";
import queryString from "query-string";


let url =
  process.env.REACT_APP_NODE_ENV === "production"
    ? "https://ass3-nodejs-q5t8.onrender.com/admin"
    : "http://localhost:5com/admin";


const axiosClient = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  console.log("config", config);

  // Nếu request là POST và dữ liệu có chứa files, set header thành 'multipart/form-data'
  if (
    config.method === "post" &&
    config.isFormData &&
    config.data instanceof FormData
  ) {
    console.log("gọi");
    console.log(
      "config.data instanceof FormData:0",
      config.data instanceof FormData
    );
    config.headers["content-type"] = "multipart/form-data";
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
