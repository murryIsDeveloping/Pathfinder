import { Component, OnInit } from '@angular/core';
import { PathFindingService, EventActions } from '../../services/path-finding.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.sass']
})
export class ControllersComponent implements OnInit {

  constructor(
    public PathFindingService: PathFindingService,
    private AnimationService: AnimationService
  ) { }

  ngOnInit(): void {
  }

  run(){
    const { pathFinder, algorithm } = this.PathFindingService
    this.AnimationService.searchAnimation(pathFinder, algorithm)
  }

  reset(){
    this.AnimationService.resetAnimation(this.PathFindingService.pathFinder)
  }

  clear(){
    this.PathFindingService.pathFinder.clear()
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
