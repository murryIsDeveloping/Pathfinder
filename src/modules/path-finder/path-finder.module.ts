import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { ControllersComponent } from './components/controllers/controllers.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';



@NgModule({
  declarations: [GridComponent, ControllersComponent, AlgorithmsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent,
  ]
})
export class PathFinderModule { }
