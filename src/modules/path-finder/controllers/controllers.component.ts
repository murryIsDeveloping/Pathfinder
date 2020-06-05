import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export enum EventActions {
  RUN,
  BLOCK,
  START,
  END,
  RESET
}

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.sass']
})
export class ControllersComponent implements OnInit {
  @Output() action = new EventEmitter<EventActions>()

  constructor() { }

  ngOnInit(): void {
  }

  run(){
    this.action.emit(EventActions.RUN)
  }

  block(){
    this.action.emit(EventActions.BLOCK)
  }

  reset(){
    this.action.emit(EventActions.RESET)
  }

  start(){
    this.action.emit(EventActions.START)
  }

  end(){
    this.action.emit(EventActions.END)
  }

}
