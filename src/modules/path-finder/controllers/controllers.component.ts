import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export enum EventActions {
  RUN,
  BLOCK,
  START,
  END,
  RESET,
}

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.sass']
})
export class ControllersComponent implements OnInit {
  @Output() action = new EventEmitter<EventActions>()
  public actionMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

  run(){
    this.action.emit(EventActions.RUN)
    this.actionMessage = ''
  }

  block(){
    this.action.emit(EventActions.BLOCK)
    this.actionMessage = 'Select cells to block'
  }

  reset(){
    this.action.emit(EventActions.RESET)
  }

  start(){
    this.action.emit(EventActions.START)
    this.actionMessage = 'Select starting cell'
  }

  end(){
    this.action.emit(EventActions.END)
    this.actionMessage = 'Select end cell'
  }

}
