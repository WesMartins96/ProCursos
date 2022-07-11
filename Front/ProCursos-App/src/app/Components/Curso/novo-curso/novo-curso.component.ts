import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Models/Categoria';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-novo-curso',
  templateUrl: './novo-curso.component.html',
  styleUrls: ['./novo-curso.component.css']
})
export class NovoCursoComponent implements OnInit {

  formulario: any;

  categorias: Categoria[];

  constructor(private categoriasServices: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasServices.PegarTodos().subscribe(res => {
      this.categorias = res;
    });

    this.formulario = new FormGroup({
      descricaoNome: new FormControl(null),
      dtInicio: new FormControl(null),
      dtTermino: new FormControl(null),
      categoriaId: new FormControl(null),
      status: new FormControl(null),
    });
  }

  //função pra ajudar a pegar o formulario
  get propriedade(){
    return this.formulario.controls;
  }

}
