import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Button from "@/components/button/button";
import Link from "next/link";
import { verificarAutenticacao } from "@/components/utils/auth";
import { erro, notificacao } from "@/components/utils/toast";
import { cadastrarGenero } from "../api/generoService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Genero = () => {
  const [genero, setGenero] = useState<string>("");
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const router = useRouter();

  async function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarGenero(genero);
      notificacao("Cadastro realizado com sucesso!");
    } catch (error: any) {
      erro(error.message);
    }
  }

  useEffect(() => {
    if (!verificarAutenticacao()) {
      router.push("/home");
    } else {
      setEstaAutenticado(true);
    }
  }, []);

  if (!estaAutenticado) {
    return null;
  }

  return (
    <>
      <Header pages="voltar" />
      <section className="min_height">
        <div className="container column">
          <div className="card">
            <div>
              <h2 className="title">Criar Gênero</h2>
              <hr className="line" />
            </div>
            <form className="form column" onSubmit={cadastrar}>
              <div className="campo_form">
                <label>Nome do Gênero</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Nome do gênero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                />
              </div>
              <div className="row">
                <Link href="/home" className="btn">
                  Cancelar
                </Link>
                <Button className="btn2" children="Salvar" type="submit"/>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Genero;
