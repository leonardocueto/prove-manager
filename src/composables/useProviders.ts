import { axios, clearToken } from "@/utils/axios";

export default function () {
  const getProviders = async () => {
    try {
      const resp = await axios.get(
        "/contacts?order_direction=ASC&type=provider"
      );
      console.log("Datos recibidos:", resp.data);
      return resp.data;
    } catch (error) {
      console.error("Error en la petición:", error);
      clearToken();
      throw new Error("Error en la petición");
    }
  };

  return {
    getProviders,
  };
}