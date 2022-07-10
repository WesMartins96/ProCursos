import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CategoriasService } from './Services/categorias.service';
import { CursosService } from './Services/cursos.service';

import { ListagemCursosComponent } from './Components/Curso/listagem-cursos/listagem-cursos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListagemCursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule

  ],

  providers: [
    CategoriasService,
    CursosService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
