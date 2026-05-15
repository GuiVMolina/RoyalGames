import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ListaCard from "@/components/lista-card/lista-card";

interface Classificacao {
  classificacaoIds: number;
  nome: string;
}

const Cadastro = () => {
  return (
    <>
      <Header />
      <section className="min_height">
        <div className="container column">
          <div className="card">
            <div>
              <h2>Cadastrar novo jogo</h2>
              <hr className="line" />
            </div>
            <div className="row">
              <div className="column">
                <div className="campo_form">
                  <label>Nome</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Nome do jogo"
                  />
                </div>
                <div className="row">
                  <div className="campo_form">
                    <label>Valor</label>
                    <input className="input" type="text" placeholder="Preço" />
                  </div>
                  <div className="campo_form">
                    <label>Gênero</label>
                    <select className="select">
                      <option value="genero">Gênero</option>
                    </select>
                  </div>
                  <div className="campo_form">
                    <label>Classificação</label>
                    <select className="select">
                      <option value="0">Livre</option>
                      <option value="12">12+</option>
                      <option value="14">14+</option>
                      <option value="16">16+</option>
                      <option value="18">18+</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="campo_form">
                    <label>Plataforma</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Plataformas do jogo"
                    />
                  </div>
                  <div className="campo_form">
                    <label>Imagem</label>
                    <input
                      className="input"
                      type="file"
                      placeholder="URL da imagem"
                    />
                  </div>
                </div>
              </div>
              <div className="campo_form">
                <label>Descrição</label>
                <textarea className="textarea" placeholder="Descrição..." />
              </div>
            </div>
          </div>
          <div>
            <h2>Lista de jogos</h2>
            <hr className="line" />
          </div>
          <ListaCard />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cadastro;
