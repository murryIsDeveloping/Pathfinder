import {
  ControllerService,
  Controls,
} from './../../../controllers/services/controller.service';
import { GraphNode } from '@path-finder/graph/graph';
import { GraphPathFinder } from '@path-finder/graph/graph-path-finder';
import { PathFinderAnimator } from '@path-finder/animation';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowService } from './../../../shared/window.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass'],
})
export class GraphComponent implements OnInit, OnDestroy {
  pathFinderGraph: GraphPathFinder;
  addPointActive = false;
  removePointActive = false;
  pathFinderAnimator: PathFinderAnimator<GraphPathFinder>;
  nodeClicker$ = new Subject<GraphNode>();
  subscriptions: Subscription[] = [];

  constructor(
    public WindowService: WindowService,
    public ControllerService: ControllerService
  ) {}

  ngOnInit(): void {
    this.pathFinderGraph = new GraphPathFinder(
      window.innerHeight - 250,
      window.innerWidth
    );
    this.pathFinderAnimator = new PathFinderAnimator<GraphPathFinder>(
      this.pathFinderGraph
    );
    this.resizeSubscriber();
    this.controllerSubscriber();
  }

  resizeSubscriber() {
    this.subscriptions.push(
      this.WindowService.resize$.subscribe((val) => {
        this.pathFinderGraph.nodes.filter(
          (node) =>
            node.position.x < val.width - 30 &&
            node.position.y < val.height - 30
        );
        this.pathFinderGraph.edges = [];
        this.pathFinderGraph.nodes.forEach((node) => {
          this.pathFinderGraph.addEdges(node);
        });
      })
    );
  }

  controllerSubscriber() {
    this.subscriptions.push(
      this.ControllerService.contollers$.subscribe(({ control, algorithm }) => {
        this.pathFinderGraph.algorithum = algorithm;
        switch (control) {
          case Controls.Play:
            this.pathFinderAnimator.searchAnimation(100);
            break;
          case Controls.Reset:
            this.pathFinderAnimator.resetAnimation();
            break;
          case Controls.Clear:
            this.pathFinderAnimator.resetAnimation();
            this.pathFinderGraph.init(
              window.innerHeight - 100,
              window.innerWidth
            );
            break;
        }
      })
    );
  }

  addPoint(event) {
    if (this.ControllerService.action$.value.title === "Add") {
      this.pathFinderGraph.addNode(event.layerX, event.layerY);
    }
  }

  removePoint(point: GraphNode) {
    if (this.ControllerService.action$.value.title === "Remove") {
      this.pathFinderGraph.removeNode(point.id);
    }
  }

  onMoved(val) {
    this.pathFinderGraph.filterEdges(val);
    this.pathFinderGraph.addEdges(val);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      if(sub){
        sub.unsubscribe();
      }
    })
    this.subscriptions = [];
  }
}