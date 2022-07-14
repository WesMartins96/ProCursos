using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProCursos.API.Models;

namespace ProCursos.API.Interfaces
{
    public interface ICursoRepositorio 
    {
       Task<Curso> PegarPeloId(int cursoId);
       Task<Curso> Criar(Curso curso);
       Task<Curso> Atualizar(Curso curso);
       Task<bool> Excluir(int cursoId); 


       Task<IEnumerable<Curso>> PegarTodos();
       Task<IEnumerable<Curso>> PegarCursosAtivos();

       Task<bool> PegarCursoPeloPeriodo(Curso curso);
       Task<bool> PegarCursoJaRegistrado(Curso curso);

       IQueryable<Curso> FiltrarCursos(string nomeCurso);
       
       




    }
}