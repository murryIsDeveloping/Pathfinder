import { Component, OnInit } from '@angular/core';
import { PathFindingService } from '../../services/path-finding.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-grid-contollers',
  templateUrl: './grid-contollers.component.html',
  styleUrls: ['./grid-contollers.component.sass']
})
export class GridContollersComponent implements OnInit {

  constructor(
    public PathFindingService: PathFindingService,
    private AnimationService: AnimationService
  ) { }

  ngOnInit(): void {
  }

  addRow(){
    if(this.AnimationService.isRunning){
      return 
    }
    this.PathFindingService.pathFinder.matrix.addGridRow();
  }

  removeRow(){
    if(this.AnimationService.isRunning){
      return 
    }
    this.PathFindingService.pathFinder.matrix.removeGridRow()
  }

  addColumn(){
    if(this.AnimationService.isRunning){
      return 
    }
    this.PathFindingService.pathFinder.matrix.addGridColumn()
  }

  removeColumn(){
    if(this.AnimationService.isRunning){
      return 
    }
    this.PathFindingService.pathFinder.matrix.removeGridColumn()
  }
}
