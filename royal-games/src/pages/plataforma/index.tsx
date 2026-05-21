import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import { verificarAutenticacao } from "@/components/utils/auth";
import { erro, notificacao } from "@/components/utils/toast";
import { cadastrarPlataforma } from "../api/plataformaService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Plataforma = () => {
  const [Plataforma, setPlataforma] = useState<string>("");
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const router = useRouter();

  async function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarPlataforma(Plataforma);
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
              <h2 className="title">Criar Plataforma</h2>
              <hr className="line" />
            </div>
            <form className="form column" onSubmit={cadastrar}>
              <div className="campo_form">
                <label>Nome do Plataforma</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Nome da plataforma"
                  value={Plataforma}
                  onChange={(e) => setPlataforma(e.target.value)}
                />
              </div>
              <div className="row">
                <Link href="/home" className="btn">
                  Cancelar
                </Link>
                <button className="btn2">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Plataforma;
