using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCursos.API.Interfaces;
using ProCursos.API.Models;

namespace ProCursos.API.Repositorios
{
    public class CategoriaRepositorio : ICategoriaRepositorio
    {
        private readonly Contexto _contexto;

        public CategoriaRepositorio(Contexto contexto)
        {
            _contexto = contexto;
        }

        public async Task<IEnumerable<Categoria>> PegarTodos()
        {
            return await _contexto.Categorias.ToListAsync();
        }
    }
}