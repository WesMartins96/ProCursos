import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizarCursoComponent } from './Components/Curso/atualizar-curso/atualizar-curso.component';
import { ListagemCursosComponent } from './Components/Curso/listagem-cursos/listagem-cursos.component';
import { NovoCursoComponent } from './Components/Curso/novo-curso/novo-curso.component';

const routes: Routes = [
  {
    path: 'cursos/listagemcursos', component: ListagemCursosComponent
  },
  {
    path: 'cursos/novocurso', component: NovoCursoComponent
  },
  {
    path: 'cursos/atualizarcurso/:id', component: AtualizarCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
