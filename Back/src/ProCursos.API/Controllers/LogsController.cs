using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProCursos.API.Interfaces;
using ProCursos.API.Models;

namespace ProCursos.API.Controllers
{
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly ILogRepositorio _logRepositorio;

        public LogsController(ILogRepositorio logRepositorio)
        {
            _logRepositorio = logRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Log>>> GetLogs()
        {
            var log = await _logRepositorio.PegarTodosPelaData();
            return Ok(log);
        }
    }
}