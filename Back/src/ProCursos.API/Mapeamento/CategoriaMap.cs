using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProCursos.API.Models;

namespace ProCursos.API.Mapeamento
{
    public class CategoriaMap : IEntityTypeConfiguration<Categoria>
    {
        public void Configure(EntityTypeBuilder<Categoria> builder)
        {
            builder.HasKey(categoria => categoria.CategoriaId);
            builder.Property(categoria => categoria.CategoriaNome).IsRequired();

            // mapeamento de relacionamento entre as tabelas
            builder.HasMany(categoria => categoria.Cursos).WithOne(categoria => categoria.Categoria)
                .HasForeignKey(categoria => categoria.CursoId).IsRequired();

            builder.HasData(
                new Categoria{
                    CategoriaId = 1,
                    CategoriaNome = "Multiplataforma"
                },
                new Categoria{
                    CategoriaId = 2,
                    CategoriaNome = "Banco de dados"
                },
                new Categoria{
                    CategoriaId = 3,
                    CategoriaNome = "Metodologia"
                },
                new Categoria{
                    CategoriaId = 4,
                    CategoriaNome = "Comportamento"
                },
                new Categoria{
                    CategoriaId = 5,
                    CategoriaNome = "Comunicação"
                });

            builder.ToTable("Categorias");    
        }
    }
}