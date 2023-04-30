import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Scene3DComponent } from './scene3-d/scene3-d.component';
import { ModelComponent } from './model/model.component';
import { Model2Component } from './model2/model2.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PlayStarterComponent } from './play-starter/play-starter.component';

@NgModule({
  declarations: [
    AppComponent,
    Scene3DComponent,
    ModelComponent,
    Model2Component,
    DialogboxComponent,
    AccueilComponent,
    PlayStarterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
