import axios from "axios";

axios.defaults.baseURL = "https://api.alegra.com/api/v1";
const alegraToken = process.env.VUE_APP_TOKEN;

const setToken = (email: string) => {
  const base64Token = btoa(`${email}:${alegraToken}`);
  localStorage.setItem("token-ac", base64Token);
  axios.defaults.headers.common["Authorization"] = `Basic ${base64Token}`;
};

const clearToken = () => {
  localStorage.removeItem("token-ac");
  axios.defaults.headers.common["Authorization"] = null;
};

axios.interceptors.response.use(
  function (response) {
    //buscar bien para que es

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

export { axios, setToken, clearToken };
