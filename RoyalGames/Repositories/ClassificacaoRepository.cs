using RoyalGames.Contexts;
using RoyalGames.Domains;
using RoyalGames.Interfaces;

namespace RoyalGames.Repositories
{
    public class ClassificacaoRepository : IClassificacaoRepository
    {
        private readonly RoyalGamesContext _context;

        public ClassificacaoRepository(RoyalGamesContext context)
        {
            _context = context;
        }

        public List<Classificacao> Listar()
        {
            return _context.Classificacao.ToList();
        }

        public Classificacao ObterPorId(int id)
        {
            Classificacao classificacao = _context.Classificacao.FirstOrDefault(c => c.ClassificacaoID == id);

            return classificacao;
        }

        public bool NomeExiste(string nome, int? ClassificacaoIdAtual = null)
        {
            var consulta = _context.Classificacao.AsQueryable();

            if (ClassificacaoIdAtual.HasValue)
            {
                consulta = consulta.Where(Classificacao => Classificacao.ClassificacaoID != ClassificacaoIdAtual.Value);
            }

            return consulta.Any(c => c.Nome == nome);
        }

        public void Adicionar(Classificacao Classificacao)
        {
            _context.Classificacao.Add(Classificacao);
            _context.SaveChanges();
        }

        public void Atualizar(Classificacao Classificacao)
        {
            Classificacao ClassificacaoBanco = _context.Classificacao.FirstOrDefault(c => c.ClassificacaoID == Classificacao.ClassificacaoID);

            if (ClassificacaoBanco == null)
            {
                return;
            }

            ClassificacaoBanco.Nome = Classificacao.Nome;

            _context.SaveChanges();
        }

        public void Remover(int id)
        {
            Classificacao ClassificacaoBanco = _context.Classificacao.FirstOrDefault(c => c.ClassificacaoID == id);

            if (ClassificacaoBanco == null)
            {
                return;
            }

            _context.Classificacao.Remove(ClassificacaoBanco);
            _context.SaveChanges();
        }
    }
}