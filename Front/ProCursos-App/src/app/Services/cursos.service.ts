import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../Models/Curso';

const httpOptions = {
  headers: new HttpHeaders ({
    'ContentType' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  url: string = 'https://localhost:5001/api/Cursos';

  constructor(private http:HttpClient) { }

  PegarTodos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.url, httpOptions);
  }

  PegarCursoPeloId(cursoId: number) : Observable<Curso>{
    const apiUrl = `${this.url}/${cursoId}`;
    return this.http.get<Curso>(apiUrl, httpOptions);
  }

  NovoCurso(curso: Curso): Observable<any>{
    return this.http.post<Curso>(this.url, curso, httpOptions);
  }

  AtualizarCurso(cursoId: number,curso: Curso): Observable<any>{
    const apiUrl = `${this.url}/${cursoId}`;
    return this.http.put<Curso>(apiUrl, curso, httpOptions);
  }

  ExcluirCurso(cursoId: number): Observable<any>{
    const apiUrl = `${this.url}/${cursoId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  PegarCursando() : Observable<Curso[]>{
    const apiUrl = `${this.url}/Cursando`;
    return this.http.get<Curso[]>(apiUrl, httpOptions);
  }

}
