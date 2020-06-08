import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PathFindingService } from '../../services/path-finding.service';
import { Algorithm } from '../../algorithum';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.sass']
})
export class AlgorithmsComponent implements OnInit {
  public algorithms = this.PathFindingService.algorithms;

  constructor(
    public PathFindingService: PathFindingService
  ) { }

  ngOnInit(): void { }

  public setAlgorithm(algorithm: Algorithm){
    this.PathFindingService.algorithm = algorithm;
  }
}
