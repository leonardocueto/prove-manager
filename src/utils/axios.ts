import axios from "axios";

axios.defaults.baseURL = "https://api.alegra.com/api/v1";
const alegraToken = "cdd0aa7f6bd82b3a5ff4";

const setToken = (email: string) => {
  const base64Token = btoa(`${email}:${alegraToken}`);
  localStorage.setItem("token-ac", base64Token);
};

const clearToken = () => {
  localStorage.removeItem("token-ac");
  delete axios.defaults.headers.common["Authorization"];
};

axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token-ac");

    if (token) {
      request.headers["Authorization"] = `Basic ${token}`;
    }

    return request;
  },
  (e) => Promise.reject(e)
);

axios.interceptors.response.use(
  function (response) {
    //cualquier codigo dentro del rango 200 causa la ejecución
    return response;
  },
  function (e) {
    const status = e?.response?.status;
    if (status === 401) {
      clearToken();
      window.location.href = "/";
    }

    return Promise.reject(e);
  }
);

export { axios, setToken, clearToken, alegraToken };
