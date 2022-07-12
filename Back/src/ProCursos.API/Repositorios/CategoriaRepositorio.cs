using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProCursos.API.Interfaces;
using ProCursos.API.Models;

namespace ProCursos.API.Repositorios
{
    public class CategoriaRepositorio : RepositorioGenerico<Categoria>, ICategoriaRepositorio
    {
        public CategoriaRepositorio(Contexto contexto) : base(contexto)
        {
        }
    }
}