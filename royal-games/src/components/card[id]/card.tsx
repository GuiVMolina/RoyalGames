import styles from "./card.module.css";
import Link from "next/link";
import { formatarPreco } from "../utils/formatacao";

type JogoProps = {
  jogoID: number;
  nome: string;
  preco: number;
  img: string;
  onDelete: (jogoId: number) => void;
  estaLogado: boolean;
};

const Card = ({
  jogoID,
  nome,
  preco,
  img,
  onDelete,
  estaLogado,
}: JogoProps) => {
  return (
    <div className="card" id={styles.card_jogo}>
      <img id={styles.card_img} src={img} alt={nome} />
      <div id={styles.card_texto}>
        <h4 className="title">{nome}</h4>
        <p className="p">{formatarPreco(preco)}</p>
      </div>

      <div id={styles.card_botoes}>
        <Link href={`/detalhe/${jogoID}`} className="btn2">
          Detalhes
        </Link>

        {estaLogado && jogoID && (
          <div id={styles.card_botoes_edit}>
            <Link href={`/jogo?id=${jogoID}`} className="btn_icon">
              ✏️
            </Link>
            <button onClick={() => onDelete(jogoID)} className="btn_icon">
              ❌
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
