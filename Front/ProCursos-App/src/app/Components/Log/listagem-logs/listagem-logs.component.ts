import { Component, OnInit } from '@angular/core';
import { Logs } from 'src/app/Models/Logs';
import { LogsService } from 'src/app/Services/logs.service';

@Component({
  selector: 'app-listagem-logs',
  templateUrl: './listagem-logs.component.html',
  styleUrls: ['./listagem-logs.component.css']
})
export class ListagemLogsComponent implements OnInit {

  constructor(private logsService: LogsService) { }

  logs: Logs[];
  displayedColumns: string[];

  ngOnInit(): void {
    this.ListarLog();
    this.displayedColumns = this.ExibirColunas();
  }

  ListarLog(){
    this.logsService.PegarLogs().subscribe(res => {
      this.logs = res;
    })
  }

  ExibirColunas(): string[]{
    return ['curso', 'dtInclusao', 'dtAtualizacao', 'usuario']
  }

}
