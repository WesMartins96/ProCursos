using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProCursos.API.Models
{
    public class Log
    {
        public int LogId { get; set; }

        public int CursoId { get; set; }
        public Curso Curso { get; set; }

        public DateTime DtInclusao { get; set; }
        public DateTime DtAtualizacao { get; set; }

        public string Usuario { get; set; }
    }
}