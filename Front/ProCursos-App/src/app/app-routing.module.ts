import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCursosComponent } from './Components/Curso/listagem-cursos/listagem-cursos.component';

const routes: Routes = [
  {
    path: 'cursos/listagemcursos', component: ListagemCursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
