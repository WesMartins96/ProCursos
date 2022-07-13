using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCursos.API.Interfaces;
using ProCursos.API.Models;

namespace ProCursos.API.Repositorios
{
    public class LogRepositorio : ILogRepositorio
    {
        private readonly Contexto _contexto;

        public LogRepositorio(Contexto contexto)
        {
            _contexto = contexto;
        }

        public async Task<Log> Atualizar(Log log)
        {
            _contexto.Logs.Update(log);
            await _contexto.SaveChangesAsync();
            return log;
        }

        public async Task<Log> Criar(Log log)
        {
            _contexto.Logs.Add(log);
            await _contexto.SaveChangesAsync();
            return log;
        }

        public async Task<bool> Excluir(int logId)
        {
            try
            {
                var entity = await _contexto.Logs.FirstOrDefaultAsync(l => l.LogId == logId);
                if (entity == null) return false;
                    _contexto.Logs.Remove(entity);
                    await _contexto.SaveChangesAsync();
                    return true;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<Log> PegarPeloCursoId(int cursoId)
        {
            var entity = await _contexto.Logs.FirstOrDefaultAsync(l => l.CursoId == cursoId);
            if (entity == null) return null;
            return entity;

        }

        public async Task<Log> PegarPeloId(int logId)
        {
            var entity = await _contexto.Logs.FindAsync(logId);
            if (entity == null) return null;
            return entity;
            
        }

        public async Task<IEnumerable<Log>> PegarTodos()
        {
            return await _contexto.Logs.ToListAsync();
        }

        public async Task<IEnumerable<Log>> PegarTodosPelaData()
        {
            return await _contexto.Logs.OrderByDescending(l => l.DtAtualizacao)
                                                            .Include(c => c.Curso).ToListAsync();
        }
    }
}