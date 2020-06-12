import { Component, OnInit } from '@angular/core';
import { PathFindingService, EventActions } from '../../services/path-finding.service';

@Component({
  selector: 'app-action-controllers',
  templateUrl: './action-controllers.component.html',
  styleUrls: ['./action-controllers.component.sass']
})
export class ActionControllersComponent implements OnInit {

  constructor(
    public PathFindingService: PathFindingService
  ) { }

  ngOnInit(): void {
  }

  block(){
    this.PathFindingService.setAction(EventActions.BLOCK)
  }

  start(){
    this.PathFindingService.setAction(EventActions.START)
  }

  end(){
    this.PathFindingService.setAction(EventActions.END)
  }

  waypoint(){
    this.PathFindingService.setAction(EventActions.WAYPOINT)
  }

  increaseWeight(){
    this.PathFindingService.setAction(EventActions.INCREASEWEIGHT)
  }

  decreaseWeight(){
    this.PathFindingService.setAction(EventActions.DECREASEWEIGHT)
  }
}
