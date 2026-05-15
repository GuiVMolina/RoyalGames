import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header id={styles.header}>
      <div className="container">
        <Link href="/home">
          <img id={styles.logo} src="../imgs/royal_games_logo.png" />
        </Link>
        <nav className="nav">
          <Link href="/home" className="link">
            Catálogo
          </Link>
          <Link href="/login" className="link_redirect">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;