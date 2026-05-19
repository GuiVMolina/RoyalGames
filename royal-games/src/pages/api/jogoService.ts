import { api } from "./api";

type JogoFormulario = {
  nome: string;
  preco: string;
  descricao: string;
  generoIds: number[];
  plataformaIds: number[];
  classificacaoIds: number[];
  imagem: File | null;
};

interface JogoListagem {
  nome: string;
  preco: string;
  descricao: string;
  generoIds: number[];
  plataformaIds: number[];
  classificacaoIds: number[];
  imagemUrl: string;
  statusJogo: boolean;
}

export async function cadastrarJogo(dados: JogoFormulario) {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("preco", dados.preco);
    formData.append("descricao", dados.descricao);
    formData.append("classificacaoID", dados.classificacaoIds[0].toString());

    dados.generoIds.forEach((generoId) => {
      formData.append("generoIds", generoId.toString());
    });
    dados.plataformaIds.forEach((plataformaId) => {
      formData.append("plataformaIds", plataformaId.toString());
    });

    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }

    await api.post("jogo", formData);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarJogo() {
  try {
    const response = await api.get("jogo");
    const jogosAtivos = response.data.filter(
      (jogo: JogoListagem) => jogo.statusJogo === true,
    );

    const jogos = jogosAtivos.map((jogo: JogoListagem) => ({
      ...jogo,
      imagemUrl: `${api.defaults.baseURL}${jogo.imagemUrl}`,
    }));

    return jogos;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarPorId(id: number) {
  try {
    const response = await api.get("jogo/" + id);

    const jogo = {
      ...response.data,
      imagemUrl: `${api.defaults.baseURL}${response.data.imagemUrl}`,
    };

    return jogo;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function excluirJogo(id: number) {
  try {
    await api.delete("jogo/" + id);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function editarJogo(id: number, dados: JogoFormulario) {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("preco", dados.preco);
    formData.append("descricao", dados.descricao);
    formData.append("classificacaoID", dados.classificacaoIds[0].toString());

    dados.generoIds.forEach((generoId) => {
      formData.append("generoIds", generoId.toString());
    });
    dados.plataformaIds.forEach((plataformaId) => {
      formData.append("plataformaIds", plataformaId.toString());
    });

    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }

    await api.put("jogo/" + id, formData);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
