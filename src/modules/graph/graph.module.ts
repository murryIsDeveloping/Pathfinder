import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { GraphComponent } from './components/graph/graph.component';
import { GraphPointComponent } from './components/graph-point/graph-point.component';


@NgModule({
  declarations: [
    GraphPointComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
  ],
  exports: [
    GraphComponent
  ]
})
export class GraphModule { }
