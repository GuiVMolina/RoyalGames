using System;
using System.Collections.Generic;

namespace RoyalGames.Domains;

public partial class Classificacao
{
    public int ClassificacaoID { get; set; }

    public string? Nome { get; set; }

    public virtual ICollection<Jogo> Jogo { get; set; } = new List<Jogo>();
}
