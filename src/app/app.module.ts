import { ControllersModule } from './../modules/controllers/controllers.module';
import { GraphModule } from './../modules/graph/graph.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixModule } from 'src/modules/matrix/matrix.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ControllersModule,
    BrowserModule,
    AppRoutingModule,
    MatrixModule,
    BrowserAnimationsModule,
    GraphModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
