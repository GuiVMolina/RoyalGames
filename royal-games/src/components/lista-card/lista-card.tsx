import Link from "next/link";
import Card from "../card/card";
import styles from "./lista-module.module.css";

const ListaCard = () => {
  return (
    <>
      <div className="row">
        <input className="input" type="text" placeholder="Pesquisa seu jogo" />
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
      <div id={styles.lista_card}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default ListaCard;
