import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/Services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-listagem-cursos',
  templateUrl: './listagem-cursos.component.html',
  styleUrls: ['./listagem-cursos.component.css']
})
export class ListagemCursosComponent implements OnInit {


  cursos = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();

  opcoesCursos: string[] = [];
  nomesCursos: Observable<string[]>;

  erros: string[];


  constructor(private cursosService: CursosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.cursosService.PegarTodos().subscribe(res => {
      res.forEach(c => {
        this.opcoesCursos.push(c.descricaoCurso);
      });

      this.cursos.data = res;

    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCursos = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(curso => this.FiltrarCursos(curso)));


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

  FiltrarCursos(nome: string): string[]{
    if (nome.trim().length >= 4) {
      this.cursosService.FiltrarCursos(nome).subscribe(res => {
        this.cursos.data = res;
      });
    }
    else{
      if (nome === '') {
        this.cursosService.PegarTodos().subscribe(resultado => {
          this.cursos.data = resultado;
        })
      }
    }

    return this.opcoesCursos.filter(c =>
      c.toLowerCase().includes(nome.toLowerCase())
    );
  }

  FiltrarPelaData(): void{

  }



}

@Component({
  selector: 'app-dialog-exclusao-cursos',
  templateUrl: 'dialog-exclusao-cursos.html'
})
export class DialogExclusaoCursosComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public dados: any,
  private cursosServices: CursosService,
  private snackBar: MatSnackBar){ }

  ExcluirCurso(cursoId): void{

    this.cursosServices.ExcluirCurso(cursoId).subscribe(res => {
       this.snackBar.open(res.mensagem, null, {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    (err => {
      this.snackBar.open(err.mensagem , ("Não é possivel deletar cursos finalizados"), {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    }));
  }
}
