import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Models/Categoria';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CursosService } from 'src/app/Services/cursos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novo-curso',
  templateUrl: './novo-curso.component.html',
  styleUrls: ['./novo-curso.component.css']
})
export class NovoCursoComponent implements OnInit {

  formulario: any;

  categorias: Categoria[];

  erros: string[];

  constructor(private categoriasServices: CategoriasService,
    private cursosServices: CursosService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.categoriasServices.PegarTodos().subscribe(res => {
      this.categorias = res;
    });

    this.formulario = new FormGroup({
      descricaoCurso: new FormControl(null, [Validators.required]),
      dtInicio: new FormControl(null, [Validators.required]),
      dtTermino: new FormControl(null, [Validators.required]),
      qtdAlunos: new FormControl(0),
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
      this.snackBar.open(res.mensagem, null, {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    (err) => {
      this.snackBar.open(err.mensagem , ("Não é possivel inserir cursos na data informada"), {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
      console.log(err);
    });
  }

  VoltarListagem(): void{
    this.router.navigate(['cursos/listagemcursos'])
  }

}
