import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <div className="container">
        <Link href="/home">
          <img id={styles.logo} src="../imgs/royal_games_logo.png" />
        </Link>
        <ul className="ul">
          <li>royalgames@email.com</li>
          <li>(11)99999-9999</li>
          <li>@RoyalGames</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
