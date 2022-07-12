using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProCursos.API.Interfaces
{
    public interface IRepositorioGenerico<TEntity> where TEntity : class
    {
        IQueryable<TEntity> PegarTodos();

        Task<TEntity> PegarPeloId(int id);

        Task Inserir(TEntity entity);
        Task Inserir(List<TEntity> entity);

        Task Atualizar(TEntity entity);

        Task Excluir(int id);
    }
}