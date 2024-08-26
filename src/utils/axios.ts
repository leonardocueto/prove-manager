import axios from "axios";

axios.defaults.baseURL = "https://api.alegra.com/api/v1";
const alegraToken = "a0e83b406b0a6e76b17d";

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
