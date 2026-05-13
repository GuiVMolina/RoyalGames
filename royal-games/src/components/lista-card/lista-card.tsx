"use client"; // Necessário para usar hooks no Next.js App Router

import { useState } from "react";
import Link from "next/link";
import styles from "./lista-module.module.css";
import Card from "../card[id]/card";

const ListaCard = () => {
  // 1. Simulação de uma lista de dados (substitua pelo seu array real de jogos)
  const totalItens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
  ];

  // 2. Configurações da paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  // 3. Cálculos de índice para o corte (slice)
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;

  // 4. Lista fatiada que será renderizada
  const itensExibidos = totalItens.slice(indicePrimeiroItem, indiceUltimoItem);

  // 5. Cálculo do total de páginas e criação do array de números
  const totalPaginas = Math.ceil(totalItens.length / itensPorPagina);
  const numerosPaginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <>
      {/* Topo: Busca e Ações */}
      <div className="row">
        <input className="input" type="text" placeholder="Pesquisa seu jogo" />
        <Link className="btn" href="/cadastro">
          Cadastro
        </Link>
      </div>

      {/* Grid de Cards */}
      <article id={styles.lista_card}>
        {itensExibidos.map((item, index) => (
          <Card key={index} />
        ))}
      </article>

      {/* Controles de Paginação Numérica */}
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "20px",
        }}
      >
        {/* Botão Voltar */}
        <button
          className="btn"
          onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaAtual === 1}
          style={{ cursor: paginaAtual === 1 ? "not-allowed" : "pointer" }}
        >
          &lt;
        </button>

        {/* Números das Páginas */}
        {numerosPaginas.map((numero) => (
          <button
            key={numero}
            onClick={() => setPaginaAtual(numero)}
            className="btn"
            style={{
              backgroundColor:
                paginaAtual === numero ? "var(--rosa)" : "transparent",
            }}
          >
            {numero}
          </button>
        ))}

        {/* Botão Próximo */}
        <button
          className="btn"
          onClick={() =>
            setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
          }
          disabled={paginaAtual === totalPaginas}
          style={{
            cursor: paginaAtual === totalPaginas ? "not-allowed" : "pointer",
          }}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default ListaCard;
