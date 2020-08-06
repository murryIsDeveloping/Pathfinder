import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GridComponent } from './components/grid/grid.component';
import { ControllersComponent } from './components/controllers/controllers.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';
import { GridContollersComponent } from './components/grid-contollers/grid-contollers.component';
import { ActionControllersComponent } from './components/action-controllers/action-controllers.component';
import { GraphComponent } from './components/graph/graph.component';
import { GraphPointComponent } from './components/graph-point/graph-point.component';



@NgModule({
  declarations: [GridComponent, ControllersComponent, AlgorithmsComponent, GridContollersComponent, ActionControllersComponent, GraphComponent, GraphPointComponent],
  imports: [
    CommonModule,
    DragDropModule,
  ],
  exports: [
    GridComponent,
    GraphComponent
  ]
})
export class PathFinderModule { }
