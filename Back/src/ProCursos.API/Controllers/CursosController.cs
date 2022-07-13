using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProCursos.API.Interfaces;
using ProCursos.API.Models;

namespace ProCursos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : Controller
    {
        private readonly ICursoRepositorio _cursoRepositorio;
        private readonly ILogRepositorio _logRepositorio;

        public CursosController(ICursoRepositorio cursoRepositorio, ILogRepositorio logRepositorio)
        {
            _cursoRepositorio = cursoRepositorio;
            _logRepositorio = logRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            var entity = await _cursoRepositorio.PegarTodos();
            return Ok(entity);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _cursoRepositorio.PegarPeloId(id);

            if (curso == null)
            {
                return NotFound();
            }
            return curso;
        }

        [HttpGet("Cursando/")]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursosAtivos()
        {
            var entity = await _cursoRepositorio.PegarCursosAtivos();
            return Ok(entity);
        }

        // atualizar registros
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Curso curso)
        {
            if (id != curso.CursoId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                await _cursoRepositorio.Atualizar(curso);

                return Ok(new {
                    mensagem = $"Curso {curso.DescricaoCurso} atualizado com Sucesso!"
                });
            }

            return BadRequest(ModelState);
        }

        // inserir registro
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            if (ModelState.IsValid)
            {
                await _cursoRepositorio.Criar(curso);

                 return Ok(new {
                    mensagem = $"Curso {curso.DescricaoCurso} cadastrada com Sucesso!"
                });
            }

            //criar log
            var log = new Log()
            {
                CursoId = curso.CursoId,
                DtInclusao = DateTime.Now,
                Usuario = "Admin"              
            };

            return BadRequest(ModelState);
        }    

        [HttpDelete("{id}")]
        public async Task<ActionResult<Curso>> DeleteCurso(int id)
        {
            var curso = await _cursoRepositorio.PegarPeloId(id);
            if (curso.DtTermino.Date < DateTime.Now.Date)
            {
                return BadRequest("Não pode ser feita a exclusão de um curso já finalizado");
            }
            if (curso == null)
            {
                return NotFound();
            }else
 

            await _cursoRepositorio.Excluir(id);

             return Ok(new {
                    mensagem = $"Curso {curso.DescricaoCurso} Excluido com Sucesso!"
                });
        }




    }
}