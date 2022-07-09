using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProCursos.API.Models
{
    public class Curso
    {
        public int CursoId { get; set; }
        public string DescricaoCurso { get; set; }
        public DateTime DtInicio { get; set; }
        public DateTime DtTermino { get; set; }
        public int QtdAlunos { get; set; }

        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }

        public bool Status { get; set; }

    }
}