import ListaCard from "@/components/lista-card/lista-card";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import { cadastrarJogo, editarJogo, listarPorId } from "../api/jogoService";
import { listarClassificacao } from "../api/classificacaoService";
import { verificarAutenticacao } from "@/components/utils/auth";
import { erro, notificacao } from "@/components/utils/toast";
import { listarPlataforma } from "../api/plataformaService";
import { listarGenero } from "../api/generoService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Genero {
  generoID: number;
  nome: string;
}

interface Plataforma {
  plataformaID: number;
  nome: string;
}

interface Classificacao {
  classificacaoID: number;
  nome: string;
}

const Jogo = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);

  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);

  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);
  const [plataformasSelecionadas, setPlataformasSelecionadas] = useState<
    number[]
  >([]);

  const [classificacaoSelecionada, setClassificacaoSelecionada] =
    useState<number>(0);

  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const telaEditar = !!id;

  async function listarGenerosJogo() {
    try {
      const lista = await listarGenero();
      setGeneros(lista.data);
    } catch (error) {
      erro("Erro ao carregar Gêneros");
    }
  }

  async function listarPlataformasJogo() {
    try {
      const lista = await listarPlataforma();
      setPlataformas(lista.data);
    } catch (error) {
      erro("Erro ao carregar Plataformas");
    }
  }

  async function listarClassificacaoJogo() {
    try {
      const lista = await listarClassificacao();
      setClassificacoes(lista.data);

      if (!telaEditar && lista.data && lista.data.length > 0) {
        setClassificacaoSelecionada(Number(lista.data[0].classificacaoID));
      }
    } catch (error) {
      erro("Erro ao carregar Classificação");
    }
  }

  async function carregarInformacoes() {
    if (!id) return;
    try {
      const jogo = await listarPorId(Number(id));
      setNome(jogo.nome);
      setDescricao(jogo.descricao);
      setPreco(String(jogo.preco));

      if (jogo.generoIds) {
        const genIds = jogo.generoIds.map((p: any) =>
          typeof p === "object" ? Number(p.generoIds || p.id) : Number(p),
        );
        setGenerosSelecionados(genIds);
      }

      if (jogo.plataformaIds) {
        const platIds = jogo.plataformaIds.map((p: any) =>
          typeof p === "object" ? Number(p.plataformaIds || p.id) : Number(p),
        );
        setPlataformasSelecionadas(platIds);
      }

      if (jogo.classificacaoIds) {
        const classId = Array.isArray(jogo.classificacaoIds)
          ? Number(jogo.classificacaoIds[0])
          : Number(jogo.classificacaoIds);
        setClassificacaoSelecionada(classId || 0);
      }
    } catch (error) {
      erro("Erro ao carregar dados do jogo");
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    if (!verificarAutenticacao()) {
      router.push("/home");
      return;
    }

    setEstaAutenticado(true);
    carregarInformacoes();

    listarGenerosJogo();
    listarPlataformasJogo();
    listarClassificacaoJogo();
  }, [router.isReady, id]);

  if (!estaAutenticado) {
    return null;
  }

  async function salvarJogo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const dados = {
        nome,
        descricao,
        preco,
        imagem,
        generoIds: generosSelecionados,
        plataformaIds: plataformasSelecionadas,
        classificacaoIds: [classificacaoSelecionada],
      };

      if (telaEditar) {
        await editarJogo(Number(id), dados);
        notificacao("Jogo editado!");
      } else {
        await cadastrarJogo(dados);
        notificacao("Jogo cadastrado!");
      }
    } catch (error: any) {
      erro("Erro ao salvar");
      console.log(error.message);
    }
  }

  return (
    <>
      <Header pages="voltar" />
      <section className="min_height">
        <div className="container column">
          <div className="card">
            <div>
              <h2>{telaEditar ? "Editar" : "Criar"} jogo</h2>
              <hr className="line" />
            </div>
            <form className="column" onSubmit={salvarJogo}>
              <div className="row">
                <div className="column">
                  <div className="campo_form">
                    <label>Nome</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Nome do jogo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="campo_form">
                      <label>Valor</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Preço"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                      />
                    </div>

                    <div className="campo_form">
                      <label>Classificação</label>
                      <select
                        className="select"
                        value={classificacaoSelecionada}
                        onChange={(e) =>
                          setClassificacaoSelecionada(Number(e.target.value))
                        }
                        required
                      >
                        {classificacaoSelecionada === 0 && (
                          <option value={0}>Selecione...</option>
                        )}
                        {classificacoes.map((item) => (
                          <option
                            key={item.classificacaoID}
                            value={item.classificacaoID}
                          >
                            {item.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="campo_form">
                      <label className="label">Gênero</label>
                      <div className="checkbox">
                        {generos.map((item) => (
                          <div key={item.generoID}>
                            <input
                              type="checkbox"
                              id={`gen-${item.generoID}`}
                              value={item.generoID}
                              checked={generosSelecionados.includes(
                                Number(item.generoID),
                              )}
                              onChange={(e) => {
                                const genId = Number(e.target.value);
                                if (e.target.checked) {
                                  setGenerosSelecionados([
                                    ...generosSelecionados,
                                    genId,
                                  ]);
                                } else {
                                  setGenerosSelecionados(
                                    generosSelecionados.filter(
                                      (g) => g !== genId,
                                    ),
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={`gen-${item.generoID}`}
                              className="checkbox_label"
                            >
                              {item.nome}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="campo_form">
                      <label className="label">Plataforma</label>
                      <div className="checkbox">
                        {plataformas.map((item) => (
                          <div key={item.plataformaID}>
                            <input
                              type="checkbox"
                              id={`plat-${item.plataformaID}`}
                              value={item.plataformaID}
                              checked={plataformasSelecionadas.includes(
                                Number(item.plataformaID),
                              )}
                              onChange={(e) => {
                                const platId = Number(e.target.value);
                                if (e.target.checked) {
                                  setPlataformasSelecionadas([
                                    ...plataformasSelecionadas,
                                    platId,
                                  ]);
                                } else {
                                  setPlataformasSelecionadas(
                                    plataformasSelecionadas.filter(
                                      (p) => p !== platId,
                                    ),
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={`plat-${item.plataformaID}`}
                              className="checkbox_label"
                            >
                              {item.nome}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="campo_form">
                    <label>Imagem</label>
                    <input
                      className="input"
                      type="file"
                      required={!telaEditar}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImagem(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="campo_form">
                    <label>Descrição</label>
                    <textarea
                      className="textarea"
                      placeholder="Descrição..."
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <Link href="/home" className="btn">
                  Voltar
                </Link>
                <button type="submit" className="btn2">
                  {telaEditar ? "Salvar alterações" : "Cadastrar jogo"}
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2>Lista de jogos</h2>
            <hr className="line" />
          </div>
          <ListaCard />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Jogo;
