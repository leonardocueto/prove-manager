import { axios, setToken, clearToken } from "@/utils/axios";

export default function () {
  const doLogin = async (email: string) => {
    try {
      setToken(email);
      const resp = await axios.get("/sellers/1");
      return resp.status;
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  };
  const doLogout = () => {
    clearToken();
  };

  return {
    doLogin,
    doLogout,
  };
}
