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
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }
    dados.generoIds.forEach((jogoId) => {
      formData.append("generoIds", jogoId.toString());
    });
    dados.plataformaIds.forEach((jogoId) => {
      formData.append("plataformaIds", jogoId.toString());
    });
    dados.classificacaoIds.forEach((jogoId) => {
      formData.append("classificacaoIds", jogoId.toString());
    });

    await api.post("Jogo", formData);
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

export async function listarPorId(jogoId: number) {
  try {
    const response = await api.get("Jogo/" + jogoId);

    const jogo = {
      ...response.data,
      imagemUrl: `${api.defaults.baseURL}${response.data.imagemUrl}`,
    };

    return jogo;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function excluirJogo(jogoId: number) {
  try {
    await api.delete("Jogo/" + jogoId);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function editarJogo(
  jogoId: number,
  dados: JogoFormulario,
) {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("preco", dados.preco);
    formData.append("descricao", dados.descricao);
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }
    dados.generoIds.forEach((jogoId) => {
      formData.append("generoIds", jogoId.toString());
    });
    dados.plataformaIds.forEach((jogoId) => {
      formData.append("plataformaIds", jogoId.toString());
    });
    dados.classificacaoIds.forEach((jogoId) => {
      formData.append("classificacaoIds", jogoId.toString());
    });

    await api.put("Jogo/" + jogoId, formData);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
