import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCursosComponent } from './Components/Curso/listagem-cursos/listagem-cursos.component';
import { NovoCursoComponent } from './Components/Curso/novo-curso/novo-curso.component';

const routes: Routes = [
  {
    path: 'cursos/listagemcursos', component: ListagemCursosComponent
  },
  {
    path: 'cursos/novocurso', component: NovoCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
