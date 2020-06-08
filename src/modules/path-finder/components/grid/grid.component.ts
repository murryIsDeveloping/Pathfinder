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
}
