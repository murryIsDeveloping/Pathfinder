import { AnimationService } from './../../services/animation.service';
import { PathFinderGraph } from './../../path-finder-graph';
import { GraphEdge, calcDistance, GraphNode } from './../../graph';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { WindowService } from './../../../shared/window.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit, OnDestroy {
  pathFinderGraph: PathFinderGraph;

  resizeSubscription: Subscription;

  constructor(
    public WindowService: WindowService,
    private AnimationService: AnimationService,
  ) { }

  ngOnInit(): void {
    this.pathFinderGraph = new PathFinderGraph(window.innerHeight, window.innerWidth);
    this.resizeSubscriber();
  }

  reset(){
    this.pathFinderGraph.reset();
  }

  run(){
    this.AnimationService.searchAnimation(this.pathFinderGraph);
  }

  resizeSubscriber() {
    this.resizeSubscription = this.WindowService.resize$.subscribe(val => {
      this.pathFinderGraph.nodes.filter(node => node.position.x < val.width - 30 && node.position.y < val.height - 30);
      this.pathFinderGraph.edges = [];
      this.pathFinderGraph.nodes.forEach(node => {
        this.pathFinderGraph.addEdges(node);
      });
    })
  }

  onMoved(val) {
    this.pathFinderGraph.filterEdges(val);
    this.pathFinderGraph.addEdges(val);
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
