import styles from "./header.module.css";
import Link from "next/link";
import { verificarAutenticacao } from "../utils/auth";
import { logout } from "@/pages/api/authService";
import { useEffect, useState } from "react";

type HeaderProps = {
  pages?: string;
};

const Header = ({ pages }: HeaderProps) => {
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    setEstaAutenticado(verificarAutenticacao());
  }, []);

  return (
    <header id={styles.header}>
      <div className="container">
        <Link href="/home">
          <img id={styles.logo} src="../imgs/royal_games_logo.png" />
        </Link>
        <nav className="nav">
          {pages === "home" && (
            <a href="#catalogo" className="link">
              Catálogo
            </a>
          )}
          {pages === "voltar" && (
            <Link href="/home" className="link">
              Voltar
            </Link>
          )}
          {estaAutenticado ? (
            <Link onClick={logout} href="/login" className="link_redirect">
              Logout
            </Link>
          ) : (
            <Link href="/login" className="link_redirect">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
