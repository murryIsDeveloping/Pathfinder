import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { ControllersComponent } from './components/controllers/controllers.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';
import { GridContollersComponent } from './grid-contollers/grid-contollers.component';
import { ActionControllersComponent } from './action-controllers/action-controllers.component';



@NgModule({
  declarations: [GridComponent, ControllersComponent, AlgorithmsComponent, GridContollersComponent, ActionControllersComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent,
  ]
})
export class PathFinderModule { }
