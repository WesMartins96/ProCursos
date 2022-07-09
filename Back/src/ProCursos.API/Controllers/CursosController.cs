using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProCursos.API.Models;

namespace ProCursos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : Controller
    {
        private readonly Contexto _contexto;

        public CursosController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            return await _contexto.Cursos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _contexto.Cursos.FindAsync(id);

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

            _contexto.Entry(curso).State = EntityState.Modified;

            try
            {
                await _contexto.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CursoExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // inserir registro
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            _contexto.Cursos.Add(curso);
            await _contexto.SaveChangesAsync();

            return CreatedAtAction("GetCurso", new { id = curso.CursoId }, curso);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Curso>> DeleteCurso(int id)
        {
            var curso = await _contexto.Cursos.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }

            _contexto.Cursos.Remove(curso);
            await _contexto.SaveChangesAsync();

            return curso;
        }

        private bool CursoExist(int id)
        {
            return _contexto.Cursos.Any(exist => exist.CursoId == id);
        }
    }
}