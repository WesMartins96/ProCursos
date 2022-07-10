import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from 'src/app/Services/cursos.service';

@Component({
  selector: 'app-listagem-cursos',
  templateUrl: './listagem-cursos.component.html',
  styleUrls: ['./listagem-cursos.component.css']
})
export class ListagemCursosComponent implements OnInit {

  cursos = new MatTableDataSource<any>();
  displayedColumns: string[];

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursosService.PegarTodos().subscribe(res => {
      this.cursos.data = res;
    });

    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas(): string[]{
    return ['descricaoCurso', 'dtInicio', 'dtTermino', 'categoria' ,'status', 'acoes']
  }

}
