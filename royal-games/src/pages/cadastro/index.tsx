import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ListaCard from "@/components/lista-card/lista-card";

const Cadastro = () => {
  return (
    <>
      <Header />
      <section className="min_height">
        <div className="container column">
          <div></div>
          <div className="card">
            <div>
              <h2>Cadastrar novo jogo</h2>
              <hr className="line" />
            </div>
            <div className="row">
              <div>
                <div className="campo_form">
                  <label>Nome</label>
                  <input className="input" type="text" placeholder="" />
                </div>
                <div className="row">
                  <div className="campo_form">
                    <label>Valor</label>
                    <input className="input" type="text" placeholder="" />
                  </div>
                  <div className="campo_form">
                    <label>Gênero</label>
                    <select className="select" />
                  </div>
                  <div className="campo_form">
                    <label>Classificação</label>
                    <select className="select" />
                  </div>
                </div>
                <div className="row">
                  <div className="campo_form">
                    <label>Plataforma</label>
                    <input className="input" type="text" placeholder="" />
                  </div>
                  <div className="campo_form">
                    <label>Imagem</label>
                    <select className="select" />
                  </div>
                </div>
              </div>
              <div className="campo_form">
                <label>Descrição</label>
                <input className="input" type="text" placeholder="" />
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
