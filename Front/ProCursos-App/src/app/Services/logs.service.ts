import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logs } from '../Models/Logs';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  url: string = 'https://localhost:5001/api/Logs';

  constructor(private http: HttpClient) { }

  PegarLogs(): Observable<Logs[]>{
    return this.http.get<Logs[]>(this.url, httpOptions);
  }
}
