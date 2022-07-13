using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProCursos.API.Models;

namespace ProCursos.API.Interfaces
{
    public interface ICategoriaRepositorio
    {
        Task<IEnumerable<Categoria>> PegarTodos();
    }
}