import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/Services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from 'src/app/Models/Curso';

@Component({
  selector: 'app-listagem-cursos',
  templateUrl: './listagem-cursos.component.html',
  styleUrls: ['./listagem-cursos.component.css']
})
export class ListagemCursosComponent implements OnInit {

  cursosAtivos: Curso[];
  cursos = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  cursosFiltradosDescricao: Curso[];
  opcoesCursos: string[] = [];
  dataInicialFiltro: Date;
  dataFinalFiltro: Date;
  nomesCursos: Observable<string[]>;
  buscaForm: FormGroup;

  constructor(private cursosService: CursosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cursosService.PegarTodos().subscribe(res => {
      res.forEach(curso => {
        this.opcoesCursos.push(curso.descricaoCurso);
      });

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
  CarregarCursosAtivos(): void {
    this.cursosService.PegarCursando().subscribe((res) => {
      this.cursosAtivos = res;
      this.cursosFiltradosDescricao = res;
    });
  }

  filtroData(){
    if(this.dataInicialFiltro > this.dataFinalFiltro && this.dataFinalFiltro ){
      this.snackBar.open('Data final não pode ser menor que a data inicial');
    } else if(!this.dataInicialFiltro && !this.dataFinalFiltro){
      this.CarregarCursosAtivos();
    }
    else if (this.dataInicialFiltro && !this.dataFinalFiltro){
      this.filtrarCursoDataInicial(this.dataInicialFiltro);
    }else if (!this.dataInicialFiltro && this.dataFinalFiltro){
      this.filtrarCursoDataFinal(this.dataFinalFiltro);
    }else {
      this.filtrarCursoDataInicialFinal(this.dataInicialFiltro, this.dataFinalFiltro)
    }
  }

  filtrarCursoDataInicial(dataInicial: any) : any
  {
    this.cursosFiltradosDescricao = this.cursosAtivos.filter(result =>{
      return result.dtInicio >= dataInicial || result.dtTermino >= dataInicial
    })
  }

  filtrarCursoDataFinal(dataFinal: any) : any
  {

    this.cursosFiltradosDescricao = this.cursosAtivos.filter(result =>{
      return result.dtInicio <= dataFinal || result.dtTermino <= dataFinal
    })
  }

  filtrarCursoDataInicialFinal(dataInicial:any, dataFinal: any) : any
  {
    this.cursosFiltradosDescricao = this.cursosAtivos.filter(result =>{
      return (result.dtInicio >= dataInicial || result.dtTermino >= dataInicial) && (result.dtInicio <= dataFinal || result.dtTermino <= dataFinal)
    })
  }

  LimparFiltro(){
    this.buscaForm.reset();
    this.CarregarCursosAtivos();
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
    });
  }
}
