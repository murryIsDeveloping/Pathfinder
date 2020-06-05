import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { ControllersComponent } from './controllers/controllers.component';



@NgModule({
  declarations: [GridComponent, ControllersComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent,
  ]
})
export class PathFinderModule { }
