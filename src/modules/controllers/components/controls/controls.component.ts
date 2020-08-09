import { ControllerService, Controls } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';
import { SearchType, Algorithm } from '@path-finder/types';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.sass']
})
export class ControlsComponent implements OnInit {
  searchTypes: SearchType[] = [SearchType.MATRIX, SearchType.GRAPH];
  algorithms: Algorithm[] = [Algorithm.DIJKSTRA, Algorithm.ASTAR];

  searchType: SearchType = SearchType.MATRIX;
  algorithm: Algorithm = Algorithm.DIJKSTRA;

  optionsActive = true;

  constructor(
    public ControllerService: ControllerService
  ) { }

  ngOnInit(): void {
  }

  play(){
    this.ControllerService.controls$.next(Controls.Play)
  }

  reset() {
    this.ControllerService.controls$.next(Controls.Reset)
  }

  clear(){
    this.ControllerService.controls$.next(Controls.Clear)
  }

  setSearchType(searchType: SearchType) {
    this.ControllerService.searchType$.next(searchType)
  }

  setAlgorithm(algorithm: Algorithm) {
    this.ControllerService.alorithm$.next(algorithm)
  }

  toggleOptions(){
    this.optionsActive = !this.optionsActive;
  }

}
