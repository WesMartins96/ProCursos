import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Models/Categoria';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CursosService } from 'src/app/Services/cursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-curso',
  templateUrl: './novo-curso.component.html',
  styleUrls: ['./novo-curso.component.css']
})
export class NovoCursoComponent implements OnInit {

  formulario: any;

  categorias: Categoria[];

  constructor(private categoriasServices: CategoriasService,
    private cursosServices: CursosService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoriasServices.PegarTodos().subscribe(res => {
      this.categorias = res;
    });

    this.formulario = new FormGroup({
      descricaoCurso: new FormControl(null, [Validators.required]),
      dtInicio: new FormControl(null, [Validators.required]),
      dtTermino: new FormControl(null, [Validators.required]),
      qtdAlunos: new FormControl(null),
      categoriaId: new FormControl(null, [Validators.required]),
    });
  }

  //função pra ajudar a pegar o formulario
  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const curso = this.formulario.value;

    this.cursosServices.NovoCurso(curso).subscribe(res => {
      this.router.navigate(['cursos/listagemcursos']);
    })
  }

  VoltarListagem(): void{
    this.router.navigate(['cursos/listagemcursos'])
  }

}
