import { Categoria } from "./Categoria";

export class Curso{

  cursoId: number;
  descricaoCurso: string;
  dtInicio: Date;
  dtTermino: Date;
  qtdAlunos: number;

  categoriaId: number;
  categoria: Categoria;

  status: boolean;
}
