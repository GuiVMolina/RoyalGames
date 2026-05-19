import { api } from "./api";

export async function cadastrarGenero(nome: string) {
  try {
    await api.post("genero", { nome });
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarGenero() {
  try {
    const response = await api.get("genero");
    return response;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
