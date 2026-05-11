using System;
using System.Collections.Generic;

namespace RoyalGames.Domains;

public partial class Jogo
{
    public int JogoID { get; set; }

    public string Nome { get; set; } = null!;

    public decimal Preco { get; set; }

    public byte[] Imagem { get; set; } = null!;

    public string Descricao { get; set; } = null!;

    public bool? StatusJogo { get; set; }

    public int? FK_UsuarioID { get; set; }

    public int? FK_ClassificacaoID { get; set; }

    public virtual Classificacao? FK_Classificacao { get; set; }

    public virtual Usuario? FK_Usuario { get; set; }

    public virtual ICollection<Log_AlteracaoJogo> Log_AlteracaoJogo { get; set; } = new List<Log_AlteracaoJogo>();

    public virtual ICollection<Genero> Genero { get; set; } = new List<Genero>();

    public virtual ICollection<Plataforma> Plataforma { get; set; } = new List<Plataforma>();
}
