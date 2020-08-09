import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import {MatRippleModule} from '@angular/material/core';


import { ControlsComponent } from './components/controls/controls.component';
import { ActionControllerComponent } from './components/action-controller/action-controller.component';



@NgModule({
  declarations: [
    ControlsComponent,
    ActionControllerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRippleModule
  ],
  exports: [
    ControlsComponent,
    ActionControllerComponent
  ]
})
export class ControllersModule { }
