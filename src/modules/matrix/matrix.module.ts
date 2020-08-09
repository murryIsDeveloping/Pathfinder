import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [
    GridComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    GridComponent,
  ]
})
export class MatrixModule { }
