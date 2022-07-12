import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizarCursoComponent } from './Components/Curso/atualizar-curso/atualizar-curso.component';
import { ListagemCursosComponent } from './Components/Curso/listagem-cursos/listagem-cursos.component';
import { NovoCursoComponent } from './Components/Curso/novo-curso/novo-curso.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { HomeComponent } from './Components/Home/home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'cursos/listagemcursos', component: ListagemCursosComponent
      },
      {
        path: 'cursos/novocurso', component: NovoCursoComponent
      },
      {
        path: 'cursos/atualizarcurso/:id', component: AtualizarCursoComponent
      },
      {
        path: 'home/home', component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
