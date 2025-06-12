import axios from "axios";

const httpAxios = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL:
    "https://duywebapp-c5gfcabyeaazawc9.southeastasia-01.azurewebsites.net/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

httpAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default httpAxios;
