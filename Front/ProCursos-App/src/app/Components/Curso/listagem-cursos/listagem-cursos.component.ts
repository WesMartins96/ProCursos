import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private cursosService: CursosService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cursosService.PegarTodos().subscribe(res => {
      this.cursos.data = res;
    });

    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas(): string[]{
    return ['descricaoCurso', 'dtInicio', 'dtTermino', 'qtdAlunos', 'categoria', 'acoes']
  }


  AbrirDialog(cursoId, descricaoCurso): void{
    this.dialog.open(DialogExclusaoCursosComponent, {
      data: {
        cursoId: cursoId,
        descricaoCurso: descricaoCurso
      }
    }).afterClosed().subscribe(res => {
      if (res === true) {
        this.cursosService.PegarTodos().subscribe(dados => {
          this.cursos.data = dados;
        });

        this.displayedColumns = this.ExibirColunas();
      }
    });
  }

}

@Component({
  selector: 'app-dialog-exclusao-cursos',
  templateUrl: 'dialog-exclusao-cursos.html'
})
export class DialogExclusaoCursosComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public dados: any,
  private cursosServices: CursosService){ }

  ExcluirCurso(cursoId): void{
    this.cursosServices.ExcluirCurso(cursoId).subscribe(res => {

    });
  }
}
