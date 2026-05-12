import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from "./home.module.css";
import ListaCard from "@/components/lista-card/lista-card";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section id={styles.banner}>
          <div className="container">
            <div id={styles.text_space}>
              <h1>Conheça nossos jogos!</h1>
              <p>
                Navegue por títulos de todas as gerações, descubra plataformas,
                gêneros e detalhes completos antes de escolher sua próxima
                aventura. Seu próximo jogo favorito começa aqui.
              </p>
            </div>
            <img
              id={styles.img_banner}
              src="../imgs/img_banner.png"
              alt="Imagem de uma mulher cyborg"
            />
          </div>
        </section>
        <section id={styles.catalogo}>
          <div className="container column">
            <div id={styles.catalogo_style}>
              <div id={styles.catalogo_title}>
                <h2>Catálogo de jogos</h2>
                <hr className="line" />
              </div>
              <div id={styles.catalogo_campo}>
                <input
                  className="input"
                  type="text"
                  placeholder="Pesquisa seu jogo"
                />
                <select className="select" id="">
                  <option value="menor_preco">Menor Preço</option>
                  <option value="menor_preco">Maior Preço</option>
                </select>
                <select className="select" id="">
                  <option value="categoria">Categoria</option>
                </select>
                <Link className="btn" href="/cadastro">
                  Cadastro
                </Link>
              </div>
              <ListaCard />
            </div>
          </div>
        </section>
        <section id={styles.jogos}>
          <div className="container column">
            <div>
              <h2>Jogos online podem afetar o comportamento humano?</h2>
              <hr className="line" />
            </div>
            <div className="card row">
              <img id={styles.jogos_img} src="./imgs/csgo.png" alt="" />
              <img id={styles.jogos_img} src="./imgs/csgo.png" alt="" />
            </div>
            <p>
              {" "}
              Estudos indicam que jogos podem alterar o comportamento humano…
              Principalmente quando o time resolve testar sua paciência em plena
              partida ranqueada.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
