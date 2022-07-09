import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CategoriasService } from './Services/categorias.service';
import { CursosService } from './Services/cursos.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    CategoriasService,
    CursosService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
