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

            if (curso.DtTermino.Date >= curso.DtInicio.Date)
            {
               return curso;
            }
            else{
                if (curso.DtInicio.Date <= curso.DtTermino.Date)
                {
                    return curso;
                }
            }
            
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

        public IQueryable<Curso> FiltrarCursos(string nomeCurso)
        {
            try
            {
                var entity = _contexto.Cursos.Include(c => c.Categoria)
                           .Where(c => c.DescricaoCurso.Contains(nomeCurso));

                return entity;           
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
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