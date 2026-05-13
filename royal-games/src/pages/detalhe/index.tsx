import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

const Detalhe = () => {
  return (
    <>
      <Header />
      <section className="min_height">
        <div className="container">
          <div className="card">
            <div>
              <h2>Detalhes do jogo</h2>
              <hr className="line" />
            </div>
            <div className="row">
              <div>
                <img src="./imgs/csgo.png" alt="" />
                <h3>
                  Preço: <span>R$100,00</span>
                </h3>
                <h3>
                  Classificação indicativa: <span>18 anos</span>
                </h3>
              </div>
              <div className="column">
                <h3>Counter-Strike Global Offensive</h3>
                <p>
                  League of Legends (LoL) é um jogo eletrônico do gênero MOBA
                  (Multiplayer Online Battle Arena) onde duas equipes de cinco
                  jogadores competem entre si com o objetivo de destruir a base
                  adversária. Cada jogador controla um campeão com habilidades
                  únicas, exigindo estratégia, trabalho em equipe e tomada de
                  decisões rápidas durante as partidas. O jogo possui diversos
                  modos, mapas e estilos de jogo, além de oferecer atualizações
                  frequentes com novos personagens, eventos e ajustes de
                  balanceamento. League of Legends é conhecido pelo seu cenário
                  competitivo mundial, reunindo milhões de jogadores e
                  campeonatos profissionais ao redor do mundo.
                </p>
              </div>
            </div>
            <div>
              <h4>Plataformas:</h4>
              <h4>Categorias:</h4>
              <h4>Gêneros:</h4>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Detalhe;
