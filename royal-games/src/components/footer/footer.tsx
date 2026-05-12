import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <div className="container">
        <Link href="/home">
          <img id={styles.logo} src="../imgs/royal_games_logo.png" />
        </Link>
        <li className="li">
          <ul>royalgames@email.com</ul>
          <ul>(11)99999-9999</ul>
          <ul>@RoyalGames</ul>
        </li>
      </div>
    </footer>
  );
};

export default Footer;
