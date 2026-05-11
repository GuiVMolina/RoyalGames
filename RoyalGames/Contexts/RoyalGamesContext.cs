using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using RoyalGames.Domains;

namespace RoyalGames.Contexts;

public partial class RoyalGamesContext : DbContext
{
    public RoyalGamesContext()
    {
    }

    public RoyalGamesContext(DbContextOptions<RoyalGamesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Classificacao> Classificacao { get; set; }

    public virtual DbSet<Genero> Genero { get; set; }

    public virtual DbSet<Jogo> Jogo { get; set; }

    public virtual DbSet<Log_AlteracaoJogo> Log_AlteracaoJogo { get; set; }

    public virtual DbSet<Plataforma> Plataforma { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=RoyalGames;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Classificacao>(entity =>
        {
            entity.HasKey(e => e.ClassificacaoID).HasName("PK__Classifi__D1D088EE7C93C9C3");

            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Genero>(entity =>
        {
            entity.HasKey(e => e.GeneroID).HasName("PK__Genero__A99D0268D50D4D3D");

            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Jogo>(entity =>
        {
            entity.HasKey(e => e.JogoID).HasName("PK__Jogo__591968550428035E");

            entity.ToTable(tb =>
                {
                    tb.HasTrigger("trg_AlteracaoJogo");
                    tb.HasTrigger("trg_ExclusaoJogo");
                });

            entity.HasIndex(e => e.Nome, "UQ__Jogo__7D8FE3B2FEE44BD5").IsUnique();

            entity.Property(e => e.Nome)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Preco).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.StatusJogo).HasDefaultValue(true);

            entity.HasOne(d => d.FK_Classificacao).WithMany(p => p.Jogo)
                .HasForeignKey(d => d.FK_ClassificacaoID)
                .HasConstraintName("FK__Jogo__FK_Classif__534D60F1");

            entity.HasOne(d => d.FK_Usuario).WithMany(p => p.Jogo)
                .HasForeignKey(d => d.FK_UsuarioID)
                .HasConstraintName("FK__Jogo__FK_Usuario__52593CB8");

            entity.HasMany(d => d.Genero).WithMany(p => p.Jogo)
                .UsingEntity<Dictionary<string, object>>(
                    "JogoGenero",
                    r => r.HasOne<Genero>().WithMany()
                        .HasForeignKey("GeneroID")
                        .HasConstraintName("FK_JogoGenero_Genero"),
                    l => l.HasOne<Jogo>().WithMany()
                        .HasForeignKey("JogoID")
                        .HasConstraintName("FK_JogoGenero_Jogo"),
                    j =>
                    {
                        j.HasKey("JogoID", "GeneroID");
                    });

            entity.HasMany(d => d.Plataforma).WithMany(p => p.Jogo)
                .UsingEntity<Dictionary<string, object>>(
                    "JogoPlataforma",
                    r => r.HasOne<Plataforma>().WithMany()
                        .HasForeignKey("PlataformaID")
                        .HasConstraintName("FK_JogoPlataforma_Plataforma"),
                    l => l.HasOne<Jogo>().WithMany()
                        .HasForeignKey("JogoID")
                        .HasConstraintName("FK_JogoPlataforma_Jogo"),
                    j =>
                    {
                        j.HasKey("JogoID", "PlataformaID");
                    });
        });

        modelBuilder.Entity<Log_AlteracaoJogo>(entity =>
        {
            entity.HasKey(e => e.Log_AlteracaoJogoID).HasName("PK__Log_Alte__BB9D2C4F409739CF");

            entity.Property(e => e.DataAlteracao).HasColumnType("datetime");
            entity.Property(e => e.NomeAnterior)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PrecoAnterior).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.FK_Jogo).WithMany(p => p.Log_AlteracaoJogo)
                .HasForeignKey(d => d.FK_JogoID)
                .HasConstraintName("FK__Log_Alter__FK_Jo__619B8048");
        });

        modelBuilder.Entity<Plataforma>(entity =>
        {
            entity.HasKey(e => e.PlataformaID).HasName("PK__Platafor__B835678D4B34E78E");

            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioID).HasName("PK__Usuario__2B3DE7983AF33AB4");

            entity.ToTable(tb => tb.HasTrigger("trg_ExclusaoUsuario"));

            entity.HasIndex(e => e.Email, "UQ__Usuario__A9D105348421593B").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.Senha).HasMaxLength(32);
            entity.Property(e => e.StatusUsuario).HasDefaultValue(true);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
