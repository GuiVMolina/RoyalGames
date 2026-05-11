using RoyalGames.Domains;
using RoyalGames.DTOs.Produto;

namespace RoyalGames.Applications.Conversoes
{
    public class JogoParaDto
    {
        public static LerJogoDto ConverterParaDto(Jogo jogo)
        {
            return new LerJogoDto
            {
                JogoID = jogo.JogoID,
                Nome = jogo.Nome,
                Preco = jogo.Preco,
                Descricao = jogo.Descricao,
                StatusJogo = jogo.StatusJogo,

                GeneroIds = jogo.Genero.Select(genero => genero.GeneroID).ToList(),

                Generos = jogo.Genero.Select(genero => genero.Nome).ToList(),

                PlataformaIds = jogo.Plataforma.Select(plataforma => plataforma.PlataformaID).ToList(),

                Plataformas = jogo.Plataforma.Select(plataforma => plataforma.Nome).ToList(),

                UsuarioID = jogo.FK_UsuarioID,
                UsuarioNome = jogo.FK_Usuario?.Nome,
                UsuarioEmail = jogo.FK_Usuario?.Email,

                ClassificacaoID = jogo.FK_ClassificacaoID,
                ClassificacaoNome = jogo.FK_Classificacao?.Nome
            };
        }
    }
}
