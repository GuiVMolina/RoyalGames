import { api } from "./api";
import secureLocalStorage from "react-secure-storage";

export async function login(email: string, senha: string) {
  try {
    const response = await api.post("autenticacao/login", { email, senha });
    const token = response.data.token;

    secureLocalStorage.setItem("Token", token);
  } catch (error: any) {
    throw new Error("Email ou senha inválidos");
  }
}
