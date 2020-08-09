import { ControllerService } from './../modules/controllers/services/controller.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    public ControllerService: ControllerService
  ){}
}
