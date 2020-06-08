import { Component, OnInit } from '@angular/core';
import { PathFindingService, EventActions } from '../../services/path-finding.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.sass']
})
export class ControllersComponent implements OnInit {
  public actionMessage: string;

  constructor(
    public PathFindingService: PathFindingService,
    private AnimationService: AnimationService
  ) { }

  ngOnInit(): void {
  }

  run(){
    const { pathFinder, algorithm } = this.PathFindingService
    this.AnimationService.searchAnimation(pathFinder, algorithm)
    this.actionMessage = ''
  }

  reset(){
    this.AnimationService.resetAnimation(this.PathFindingService.pathFinder)
  }

  block(){
    this.PathFindingService.setAction(EventActions.BLOCK)
    this.actionMessage = 'Select cells to block'
  }

  start(){
    this.PathFindingService.setAction(EventActions.START)
    this.actionMessage = 'Select starting cell'
  }

  end(){
    this.PathFindingService.setAction(EventActions.END)
    this.actionMessage = 'Select end cell'
  }

  waypoint(){
    this.PathFindingService.setAction(EventActions.WAYPOINT)
    this.actionMessage = 'Select waypoint'
  }
}
