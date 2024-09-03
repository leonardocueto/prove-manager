import axios from "axios";

axios.defaults.baseURL = "https://api.alegra.com/api/v1";
const alegraToken = "ca54b1e619021a649231";

const setToken = (email: string) => {
  const base64Token = btoa(`${email}:${alegraToken}`);
  localStorage.setItem("token-ac", base64Token);
  axios.defaults.headers.common["Authorization"] = `Basic ${base64Token}`;
};

const clearToken = () => {
  localStorage.removeItem("token-ac");
  delete axios.defaults.headers.common["Authorization"];
};

axios.interceptors.response.use(
  function (response) {
    //cualquier codigo dentro del rango 200 causa la ejecución
    return response;
  },
  function (error) {
    const status = error?.response?.status;
    if (status === 401) {
      clearToken();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export { axios, setToken, clearToken, alegraToken };
