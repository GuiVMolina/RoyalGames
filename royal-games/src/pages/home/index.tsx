import ListaCard from "@/components/lista-card/lista-card";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from "./home.module.css";

const Home = () => {
  return (
    <>
      <Header pages="home" />
      <main>
        <section id={styles.banner}>
          <div className="container full_width">
            <div id={styles.text_space}>
              <h1 className="title glow_text">Conheça nossos jogos!</h1>
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
        <section id="catalogo">
          <div className="container column">
            <div id={styles.catalogo_style}>
              <div>
                <h2 className="title">Catálogo de jogos</h2>
                <hr className="line" />
              </div>
              <ListaCard />
            </div>
          </div>
        </section>
        <section id={styles.jogo}>
          <div className="container column">
            <div>
              <h2 className="title">Jogos online podem afetar o comportamento humano?</h2>
              <hr className="line" />
            </div>
            <div className="card row">
              <img id={styles.jogo_img} src="imgs/csgo.png" alt="" />
              <img id={styles.jogo_img} src="imgs/csgo.png" alt="" />
            </div>
            <p className="p" id={styles.jogo_text}>
              Estudos indicam que jogos podem alterar o comportamento humano…
              <br />
              Principalmente quando o time resolve testar sua paciência em plena
              partida ranqueada
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
