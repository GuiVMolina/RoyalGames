import Link from "next/link";
import styles from "./card.module.css"

const Card = () => {
  return (
    <div className="card">
      <img id={styles.card_img} src="./imgs/minelegends.png" alt="" />
      <h2>Minecraft Legends</h2>
      <p>R$70,00</p>
      <Link href="/detalhe" className="btn2">Detalhes</Link>
    </div>
  );
};

export default Card;
