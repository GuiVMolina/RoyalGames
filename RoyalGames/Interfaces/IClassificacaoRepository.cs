using RoyalGames.Domains;

namespace RoyalGames.Interfaces
{
    public interface IClassificacaoRepository
    {
        List<Classificacao> Listar();

        Classificacao ObterPorId(int id);

        bool NomeExiste(string nome, int? classificacaoIdAtual = null);

        void Adicionar(Classificacao classificacao);

        void Atualizar(Classificacao classificacao);

        void Remover(int id);
    }
}