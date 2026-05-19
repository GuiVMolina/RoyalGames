import { api } from "./api";

export async function listarClassificacao() {
  try {
    const response = await api.get("classificacao");
    return response;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
