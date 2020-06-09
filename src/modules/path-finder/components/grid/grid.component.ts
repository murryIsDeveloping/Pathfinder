import { Component, OnInit } from '@angular/core';
import { PathNode } from '../../path-node';
import { PathFinder } from '../../path-finder';
import { PathFindingService } from '../../services/path-finding.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
  public pathfinder: PathFinder;
  constructor(
    public PathFindingService: PathFindingService
  ) {  
    this.pathfinder = this.PathFindingService.pathFinder
  }

  ngOnInit(): void { }

  public runAction(node: PathNode) {
    this.PathFindingService.action(node)
  }

  public nodeWeightStyle(node: PathNode){
    if (node.classes[1] !== '' || node.classes[2] !== ''){
      return { backgroundColor: `rgba(255,255,255,0)`} 
    }
    if (node.weightMultipler > 5){
      let val = (node.weightMultipler - 5)/10
      return { backgroundColor: `rgba(100,100,100, ${val})`}
    } else if (node.weightMultipler < 5){
      let val = Math.abs(node.weightMultipler - 5)/10
      return { backgroundColor: `rgba(255,255,255, ${val})`}
    }
  }
}
