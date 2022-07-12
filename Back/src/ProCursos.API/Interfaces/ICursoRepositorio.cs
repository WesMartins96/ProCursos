using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProCursos.API.Models;

namespace ProCursos.API.Interfaces
{
    public interface ICursoRepositorio : IRepositorioGenerico<Curso>
    {
        // aqui vai sobescrever o IrepositorioGenerico
        new IQueryable<Curso> PegarTodos();

        new Task<Curso> PegarPeloId(int id);
    }
}