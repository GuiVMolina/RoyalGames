import Button from "@/components/button/button";
import styles from "./login.module.css";
import { erro, notificacao } from "@/components/utils/toast";
import { login } from "../api/authService";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const router = useRouter();

  async function autenticar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, senha);
      notificacao("Login bem sucedido!");

      setTimeout(() => {
        router.push("/home");
      }, 3000);
    } catch (error: any) {
      erro(error.response.data);
    }
  }

  return (
    <>
      <section id={styles.login}>
        <img id={styles.img_login} src="imgs/img_login.png" alt="" />
        <form className="card" onSubmit={autenticar}>
          <img id={styles.login_logo} src="imgs/royal_games_logo.png" alt="" />
          <div className="campo_form">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="text"
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="campo_form">
            <label htmlFor="senha">Senha</label>
            <input
              className="input"
              type="password"
              placeholder="******"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <Button className="btn2" children="Entrar" />
        </form>
      </section>
    </>
  );
};

export default Login;
