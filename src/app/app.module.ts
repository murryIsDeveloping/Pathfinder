import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathFinderModule } from 'src/modules/path-finder/path-finder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PathFinderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
