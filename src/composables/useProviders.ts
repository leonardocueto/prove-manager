import { axios } from "@/utils/axios";

export default function () {
  const getProviders = async () => {
    try {
      const resp = await axios.get(
        "/contacts?order_direction=ASC&type=provider"
      );
      console.log("Datos recibidos:", resp.data);
    } catch (error) {
      console.error("Error en la petición:", error);
      throw new Error("Error en la petición");
    }
  };

  return {
    getProviders,
  };
}
