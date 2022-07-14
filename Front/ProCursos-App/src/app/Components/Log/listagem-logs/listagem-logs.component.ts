import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Logs } from 'src/app/Models/Logs';
import { LogsService } from 'src/app/Services/logs.service';

@Component({
  selector: 'app-listagem-logs',
  templateUrl: './listagem-logs.component.html',
  styleUrls: ['./listagem-logs.component.css']
})
export class ListagemLogsComponent implements OnInit {

  constructor(private logsService: LogsService) { }

  logs = new MatTableDataSource<any>();
  displayedColumns: string[];
  opcoesLogs: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.ExibirColunas();
    this.logsService.PegarLogs().subscribe(resultado => {
      resultado.forEach( l => {
        this.opcoesLogs.push(l.usuario);
      });

      this.logs.data = resultado;

    });

    this.displayedColumns = this.ExibirColunas();
  }


  ExibirColunas(): string[]{
    return ['curso', 'dtInclusao', 'dtAtualizacao', 'usuario']
  }

}
