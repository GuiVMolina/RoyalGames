"use client";

import styles from "./lista-card.module.css";
import Card from "../card[id]/card";
import Link from "next/link";
import { erro, notificacao, toastConfirmarExcluir } from "../utils/toast";
import { excluirJogo, listarJogo } from "@/pages/api/jogoService";
import { verificarAutenticacao } from "../utils/auth";
import { useEffect, useState } from "react";

interface Jogo {
  jogoID: number;
  nome: string;
  preco: number;
  descricao: string;
  generoIds: number[];
  plataformaIds: number[];
  classificacaoIds: number | number[];
  imagemUrl: string;
  statusJogo: boolean;
}

const ListaCard = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;
  const [jogo, setJogo] = useState<Jogo[]>([]);
  const [ordem, setOrdem] = useState("todos");
  const [filtroClassificacao, setFiltroClassificacao] = useState("0");
  const [pesquisa, setPesquisa] = useState("");

  // Usamos useState/useEffect para evitar incompatibilidade de hidratação no Next.js
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  async function listar() {
    try {
      const lista = await listarJogo();
      // Garante que a lista não é nula ou undefined antes de salvar
      setJogo(lista || []);
    } catch (error: any) {
      erro("Erro ao carregar jogos");
    }
  }

  function confirmarExcluir(jogoId: number) {
    if (!jogoId) {
      erro("ID do jogo inválido.");
      return;
    }

    toastConfirmarExcluir(async () => {
      try {
        await excluirJogo(jogoId);

        // Remove ou inativa o jogo da lista local instantaneamente
        setJogo((listaAtual) => listaAtual.filter((j) => j.jogoID !== jogoId));

        notificacao("Jogo inativado com sucesso!");
      } catch (error: any) {
        erro("Erro ao excluir o jogo");
      }
    });
  }

  useEffect(() => {
    listar();
    setEstaAutenticado(verificarAutenticacao());
  }, []);

  // Filtros e Ordenação
  const jogosFiltrados = jogo
    .filter((item) => {
      const nomeValido = item?.nome?.toLowerCase() || "";
      return nomeValido.includes(pesquisa.toLowerCase());
    })
    .filter((item) => {
      if (filtroClassificacao === "0") return true;
      const idadeMinima = Number(filtroClassificacao);
      const classificacoes = Array.isArray(item.classificacaoIds)
        ? item.classificacaoIds
        : [item.classificacaoIds];
      return classificacoes.some((valor) => Number(valor) >= idadeMinima);
    })
    .sort((a, b) => {
      if (ordem === "menor_preco") return a.preco - b.preco;
      if (ordem === "maior_preco") return b.preco - a.preco;
      return a.jogoID - b.jogoID;
    });

  // Paginação
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensExibidos = jogosFiltrados.slice(
    indicePrimeiroItem,
    indiceUltimoItem,
  );
  const totalPaginas = Math.ceil(jogosFiltrados.length / itensPorPagina) || 1;
  const numerosPaginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <>
      <div className="row" id={styles.botoes}>
        <input
          className="input"
          type="text"
          placeholder="Busque seu jogo..."
          value={pesquisa}
          onChange={(e) => {
            setPaginaAtual(1); // Reseta para a página 1 ao buscar
            setPesquisa(e.target.value);
          }}
        />
        <select
          className="select"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="menor_preco">Menor Preço</option>
          <option value="maior_preco">Maior Preço</option>
        </select>
        <select
          className="select"
          value={filtroClassificacao}
          onChange={(e) => setFiltroClassificacao(e.target.value)}
        >
          <option value="0">Livre</option>
          <option value="10">10+</option>
          <option value="12">12+</option>
          <option value="14">14+</option>
          <option value="16">16+</option>
          <option value="18">18+</option>
        </select>
        <Link className="btn" href="/jogo">
          Cadastro
        </Link>
      </div>

      <article id={styles.lista_card}>
        {itensExibidos.length > 0 ? (
          itensExibidos.map((item) => (
            <Card
              key={item.jogoID}
              jogoID={item.jogoID}
              nome={item.nome}
              preco={item.preco}
              img={item.imagemUrl}
              onDelete={confirmarExcluir}
              estaLogado={estaAutenticado}
            />
          ))
        ) : (
          <p>Nenhum jogo encontrado...</p>
        )}
      </article>

      {totalPaginas > 1 && (
        <div className="row">
          <button
            className="btn"
            onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaAtual === 1}
            style={{ cursor: paginaAtual === 1 ? "not-allowed" : "pointer" }}
          >
            &lt;
          </button>

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
      )}
    </>
  );
};

export default ListaCard;
