import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../Models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url: string = 'https://localhost:5001/api/Categorias';

  constructor(private http: HttpClient) { }

  PegarTodos() : Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
  }
}
