using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProCursos.API.Models;

namespace ProCursos.API.Mapeamento
{
    public class LogMap : IEntityTypeConfiguration<Log>
    {
        public void Configure(EntityTypeBuilder<Log> builder)
        {
            builder.HasKey(log => log.LogId);
            builder.Property(log => log.DtInclusao).IsRequired();
            builder.Property(log => log.DtAtualizacao).IsRequired();
            builder.Property(log => log.Usuario).IsRequired();

            // mapeamento de relacionamento entre as tabelas
            builder.HasOne(log => log.Curso).WithMany(log => log.Logs)
                .HasForeignKey(log => log.CursoId).IsRequired();

            builder.ToTable("Logs");
        }
    }
}