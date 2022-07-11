import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/Models/Categoria';
import { Curso } from 'src/app/Models/Curso';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { CursosService } from 'src/app/Services/cursos.service';

@Component({
  selector: 'app-atualizar-curso',
  templateUrl: './atualizar-curso.component.html',
  styleUrls: ['./atualizar-curso.component.css']
})
export class AtualizarCursoComponent implements OnInit {

  cursoId: number;
  nomeCurso: string;
  curso: Observable<Curso>;
  categorias: Categoria[];
  formulario: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.params.id;
    this.categoriasService.PegarTodos().subscribe(res => {
      this.categorias = res;
    });

    this.cursosService.PegarCursoPeloId(this.cursoId).subscribe(res => {
      this.nomeCurso = res.descricaoCurso;
      this.formulario = new FormGroup({
        cursoId: new FormControl(res.cursoId),
        descricaoCurso: new FormControl(res.descricaoCurso),
        dtInicio: new FormControl(res.dtInicio),
        dtTermino: new FormControl(res.dtTermino),
        qtdAlunos: new FormControl(res.qtdAlunos),
        categoriaId: new FormControl(res.categoriaId)
      });
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario(): void{
    const curso = this.formulario.value;

    this.cursosService.AtualizarCurso(this.cursoId, curso).subscribe(res => {
      this.router.navigate(['cursos/listagemcursos']);
    });
  }

  VoltarListagem(): void{
    this.router.navigate(['cursos/listagemcursos'])
  }

}
