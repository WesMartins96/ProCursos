using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCursos.API.Interfaces;
using ProCursos.API.Models;

namespace ProCursos.API.Repositorios
{
    public class CursoRepositorio : ICursoRepositorio
    {
        private readonly Contexto _contexto;

        public CursoRepositorio(Contexto contexto)
        {
            _contexto = contexto;
        }

        public async Task<Curso> Atualizar(Curso curso)
        {
            _contexto.Cursos.Update(curso);
            await _contexto.SaveChangesAsync();
            return curso;
        }

        public async Task<Curso> Criar(Curso curso)
        {
            _contexto.Cursos.Add(curso);
            await _contexto.SaveChangesAsync();
            return curso;
        }

        public async Task<bool> Excluir(int cursoId)
        {
            try
            {
                var entity = await _contexto.Cursos.FirstOrDefaultAsync(curso => curso.CursoId == cursoId);
                
                if (entity == null) return false;
                    _contexto.Cursos.Remove(entity);
                    await _contexto.SaveChangesAsync();
                    return true;

            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<bool> PegarCursoJaRegistrado(Curso curso)
        {
            var entity = await _contexto.Cursos.Where(
                e => e.DescricaoCurso.ToLower().Equals(curso.DescricaoCurso.ToLower()) 
                && e.Status && e.CursoId != curso.CursoId).ToListAsync();

            if (entity.Count() < 1) return false;
            return true;
           
        }

        public async Task<bool> PegarCursoPeloPeriodo(Curso curso)
        {
            var entity = await _contexto.Cursos.Where(
                e => (e.DtTermino.Date >= curso.DtInicio.Date) 
                && (e.DtInicio.Date <= curso.DtTermino.Date) && (e.Status && e.CursoId != curso.CursoId)).ToListAsync();


                if (entity.Count() < 1) return false;
                return true;
        }

        public async Task<IEnumerable<Curso>> PegarCursosAtivos()
        {
            return await _contexto.Cursos.Where(curso => curso.Status)
                                                .Include(curso => curso.Categoria).ToListAsync();
        }

        public async Task<Curso> PegarPeloId(int cursoId)
        {
            var entity = await _contexto.Cursos.FindAsync(cursoId);

            if (entity == null) return null;
            return entity;


        }

        public async Task<IEnumerable<Curso>> PegarTodos()
        {
            return await _contexto.Cursos.Include(curso => curso.Categoria).ToListAsync();
        }
    }
}