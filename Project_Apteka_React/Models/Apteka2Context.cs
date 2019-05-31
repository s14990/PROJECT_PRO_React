using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Project_Apteka_React.Models
{
    public partial class Apteka2Context : DbContext
    {
        public Apteka2Context()
        {
        }

        public Apteka2Context(DbContextOptions<Apteka2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Artykul> Artykul { get; set; }
        public virtual DbSet<Kategoria> Kategoria { get; set; }
        public virtual DbSet<Producent> Producent { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:serverapteka.database.windows.net,1433;Initial Catalog=Apteka2;Persist Security Info=False;User ID=apteka_admin;Password=usermain0!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Artykul>(entity =>
            {
                entity.HasKey(e => e.IdArtykul);

                entity.HasIndex(e => e.Nazwa)
                    .HasName("UQ__Artykul__602223FFC2BC3467")
                    .IsUnique();

                entity.Property(e => e.IdArtykul).HasColumnName("Id_Artykul");

                entity.Property(e => e.IdKategoria).HasColumnName("Id_Kategoria");

                entity.Property(e => e.IdProducent).HasColumnName("Id_Producent");

                entity.Property(e => e.Kod)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Nazwa)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdKategoriaNavigation)
                    .WithMany(p => p.Artykul)
                    .HasForeignKey(d => d.IdKategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Artykul_fk0");

                entity.HasOne(d => d.IdProducentNavigation)
                    .WithMany(p => p.Artykul)
                    .HasForeignKey(d => d.IdProducent)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Artykul_fk1");
            });

            modelBuilder.Entity<Kategoria>(entity =>
            {
                entity.HasKey(e => e.IdKategoria);

                entity.Property(e => e.IdKategoria).HasColumnName("Id_Kategoria");

                entity.Property(e => e.Nazwa)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Producent>(entity =>
            {
                entity.HasKey(e => e.IdProducent);

                entity.Property(e => e.IdProducent).HasColumnName("Id_Producent");

                entity.Property(e => e.Kraj)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Nazwa)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });
        }
    }
}
