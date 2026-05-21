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
  classificacaoNome?: string | null;
  imagemUrl: string;
  statusJogo: boolean;
}

const ListaCard = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  const [jogo, setJogo] = useState<Jogo[]>([]);
  const [ordem, setOrdem] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");

  const [filtroClassificacao, setFiltroClassificacao] = useState("0");

  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const classificacaoIdParaIdade: Record<number, number> = {
    1: 0,
    2: 10,
    3: 12,
    4: 14,
    5: 16,
    6: 18,
  };

  const obterIdadeClassificacao = (
    valor: number | string | null | undefined,
  ) => {
    if (valor === null || valor === undefined) return null;

    if (typeof valor === "number") {
      return classificacaoIdParaIdade[valor] ?? valor;
    }

    const texto = valor.toString().trim();
    if (/^livre$/i.test(texto)) return 0;

    const match = texto.match(/\d+/);
    return match ? Number(match[0]) : null;
  };

  async function listar() {
    try {
      const lista = await listarJogo();
      setJogo(lista);
    } catch (error: any) {
      erro("Erro ao carregar jogos");
    }
  }

  async function confirmarExcluir(jogoId: number) {
    toastConfirmarExcluir(async () => {
      try {
        await excluirJogo(jogoId);
        setJogo((listaAtual) =>
          listaAtual.map((jogo) =>
            jogo.jogoID === jogoId ? { ...jogo, statusJogo: false } : jogo,
          ),
        );

        notificacao("Jogo inativado com sucesso!");
        listar();
      } catch (error: any) {
        erro("Erro ao inativar o jogo");
      }
    });
  }

  useEffect(() => {
    setEstaAutenticado(verificarAutenticacao());
    listar();
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

      const valoresParaFiltrar = [
        ...classificacoes,
        item.classificacaoNome ?? "",
      ];

      return valoresParaFiltrar.some((valor) => {
        const idade = obterIdadeClassificacao(valor);
        return idade !== null && idade >= idadeMinima;
      });
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
            setPaginaAtual(1);
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
          <option value="0">Classificação (todas)</option>
          <option value="10">10+</option>
          <option value="12">12+</option>
          <option value="14">14+</option>
          <option value="16">16+</option>
          <option value="18">18+</option>
        </select>
        {estaAutenticado && (
          <Link className="btn" href="/jogo">
            Adicionar
          </Link>
        )}
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
          <p className="p">Nenhum jogo encontrado...</p>
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
