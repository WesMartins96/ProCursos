using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCursos.API.Interfaces;
using ProCursos.API.Models;

namespace ProCursos.API.Repositorios
{
    public class CursoRepositorio : RepositorioGenerico<Curso>, ICursoRepositorio
    {
        private readonly Contexto _contexto;

        public CursoRepositorio(Contexto contexto) : base(contexto)
        {
            _contexto = contexto;
        }

        public new IQueryable<Curso> PegarTodos()
        {
            try
            {
                return _contexto.Cursos.Include(Curso => Curso.Categoria);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public new Task<Curso> PegarPeloId(int id)
        {
            try
            {
                var entity = _contexto.Cursos.Include(curso => curso.Categoria).FirstOrDefaultAsync(curso => curso.CursoId == id);
                return entity;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public IQueryable<Curso> FiltrarCurso(string nomeCurso)
        {
            try
            {
                var entity = _contexto.Cursos.Include(curso => curso.Categoria)
                    .Where(curso => curso.DescricaoCurso.Contains(nomeCurso));

                return entity;    
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

    }
}