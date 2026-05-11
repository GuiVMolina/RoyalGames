using System;
using System.Collections.Generic;

namespace RoyalGames.Domains;

public partial class Log_AlteracaoJogo
{
    public int Log_AlteracaoJogoID { get; set; }

    public DateTime DataAlteracao { get; set; }

    public string? NomeAnterior { get; set; }

    public decimal? PrecoAnterior { get; set; }

    public int? FK_JogoID { get; set; }

    public virtual Jogo? FK_Jogo { get; set; }
}
