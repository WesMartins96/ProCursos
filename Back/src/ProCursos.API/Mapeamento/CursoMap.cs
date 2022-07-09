using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProCursos.API.Models;

namespace ProCursos.API.Mapeamento
{
    public class CursoMap : IEntityTypeConfiguration<Curso>
    {
        public void Configure(EntityTypeBuilder<Curso> builder)
        {
            builder.HasKey(curso => curso.CursoId);
            builder.Property(curso => curso.DescricaoCurso).IsRequired();
            builder.Property(curso => curso.DtInicio).IsRequired();
            builder.Property(curso => curso.DtTermino).IsRequired();
            builder.Property(curso => curso.QtdAlunos);

            // mapeamento de relacionamento entre as tabelas
            builder.HasOne(curso => curso.Categoria).WithMany(curso => curso.Cursos)
                .HasForeignKey(curso => curso.CategoriaId).IsRequired();

            builder.HasMany(curso => curso.Logs).WithOne(curso => curso.Curso);

            builder.Property(curso => curso.Status);

            builder.ToTable("Cursos");
        }
    }
}