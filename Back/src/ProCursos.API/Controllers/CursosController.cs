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

        public CursosController(ICursoRepositorio cursoRepositorio)
        {
            _cursoRepositorio = cursoRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            return await _cursoRepositorio.PegarTodos().ToListAsync();
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
                await _cursoRepositorio.Inserir(curso);

                 return Ok(new {
                    mensagem = $"Curso {curso.DescricaoCurso} cadastrada com Sucesso!"
                });
            }

            return BadRequest(ModelState);
        }    

        [HttpDelete("{id}")]
        public async Task<ActionResult<Curso>> DeleteCurso(int id)
        {
            var curso = await _cursoRepositorio.PegarPeloId(id);
            if (curso == null)
            {
                return NotFound();
            }

            await _cursoRepositorio.Excluir(id);

             return Ok(new {
                    mensagem = $"Curso {curso.DescricaoCurso} Excluido com Sucesso!"
                });
        }

        [HttpGet("FiltrarCursos/{nomeCurso}")]
        public async Task<ActionResult<IEnumerable<Curso>>> FiltrarCursos(string nomeCurso)
        {
            return await _cursoRepositorio.FiltrarCurso(nomeCurso).ToListAsync();
        }

    }
}