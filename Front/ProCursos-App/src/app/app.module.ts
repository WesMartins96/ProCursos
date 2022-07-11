import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Angular Material
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CategoriasService } from './Services/categorias.service';
import { CursosService } from './Services/cursos.service';

import { DialogExclusaoCursosComponent, ListagemCursosComponent } from './Components/Curso/listagem-cursos/listagem-cursos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NovoCursoComponent } from './Components/Curso/novo-curso/novo-curso.component';
import { AtualizarCursoComponent } from './Components/Curso/atualizar-curso/atualizar-curso.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    ListagemCursosComponent,
    NovoCursoComponent,
    AtualizarCursoComponent,
    DialogExclusaoCursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    MatDialogModule,
  ],

  providers: [
    CategoriasService,
    CursosService,
    HttpClientModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
