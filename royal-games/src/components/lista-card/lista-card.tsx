import Card from "../card/card";
import styles from "./lista-module.module.css"

const ListaCard = () => {
  return (
    <div id={styles.lista_card}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default ListaCard;
