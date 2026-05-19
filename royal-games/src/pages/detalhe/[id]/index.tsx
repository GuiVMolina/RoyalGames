import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from "./detalhe.module.css";
import { formatarPreco } from "@/components/utils/formatacao";
import { listarPorId } from "../../api/jogoService";
import { erro } from "@/components/utils/toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Jogo = {
  jogoID: number;
  nome: string;
  preco: number;
  descricao: string;
  imagemUrl: string;
  generos: string[];
  plataformas: string[];
  classificacaoNome: string | null;
};
const Detalhe = () => {
  const [jogo, setJogo] = useState<Jogo | null>(null);
  const params = useParams();
  const id = params?.id;

  async function listarJogo() {
    try {
      const response = await listarPorId(Number(id));
      setJogo(response);
    } catch (error: any) {
      erro(error.message);
    }
  }

  useEffect(() => {
    if (!id) return;
    listarJogo();
  }, [id]);

  if (!jogo) {
    return (
      <>
        <Header />
        <section className="min_height">
          <div className="container column">
            <div className="card">
              <p>Carregando jogo...</p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="min_height">
        <div className="container column">
          <div className="card">
            <div>
              <h2>Detalhes do jogo</h2>
              <hr className="line" />
            </div>
            <div className="row">
              <div>
                <img
                  src={jogo.imagemUrl}
                  alt={jogo.nome}
                  id={styles.card_img}
                />
                <h3>
                  Preço: <span>{formatarPreco(jogo.preco)}</span>
                </h3>
              </div>
              <div className="column">
                <h3>{jogo.nome}</h3>
                <p>{jogo.descricao}</p>
              </div>
            </div>
            <div className="row">
              <h4>
                Classificação indicativa:{" "}
                <span>{jogo.classificacaoNome ?? "--"}</span>
              </h4>
              <div>
                <h4>Plataformas:</h4>
                <ul>
                  {jogo.plataformas?.map((cat) => (
                    <li className="li" key={`plataforma-${cat}`}>
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Gêneros:</h4>
                <ul>
                  {jogo.generos?.map((cat) => (
                    <li className="li" key={`genero-${cat}`}>
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Detalhe;
