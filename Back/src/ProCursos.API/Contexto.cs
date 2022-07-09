using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCursos.API.Mapeamento;
using ProCursos.API.Models;

namespace ProCursos.API
{
    public class Contexto : DbContext
    {
        public DbSet<Categoria> Categorias { get; set;}
        public DbSet<Curso> Cursos { get; set;}
        public DbSet<Log> Logs { get; set;}

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes){ }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new CategoriaMap());
            builder.ApplyConfiguration(new CursoMap());
            builder.ApplyConfiguration(new LogMap());
        }
    }
}