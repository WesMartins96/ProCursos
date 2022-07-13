using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProCursos.API.Models;

namespace ProCursos.API.Interfaces
{
    public interface ILogRepositorio
    {
        Task<IEnumerable<Log>> PegarTodos();
        Task<IEnumerable<Log>> PegarTodosPelaData();

        Task<Log> PegarPeloId(int logId);
        Task<Log> PegarPeloCursoId(int cursoId);

        Task<Log> Criar(Log log);
        Task<Log> Atualizar(Log log);
        Task<bool> Excluir(int logId);
    }
}