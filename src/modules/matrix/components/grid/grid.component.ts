import { Subscription, Subject } from 'rxjs';
import {
  ControllerService,
  Controls,
} from './../../../controllers/services/controller.service';
import { PathFinderAnimator } from '@path-finder/animation';
import { MatrixPathFinder } from '@path-finder/matrix/matrix-path-finder';
import { PathNode } from '@path-finder/matrix/matrix';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass'],
})
export class GridComponent implements OnInit, OnDestroy {
  public pathFinderMatrix: MatrixPathFinder = new MatrixPathFinder();
  public pathFinderAnimator: PathFinderAnimator<MatrixPathFinder>;
  private subscriptions: Map<string, Subscription> = new Map();
  public nodeClicker$ = new Subject<PathNode>();

  constructor(public ControllerService: ControllerService) {
    this.pathFinderAnimator = new PathFinderAnimator<MatrixPathFinder>(
      this.pathFinderMatrix
    );
  }

  ngOnInit(): void {
    this.controllerSubscriber();
    this.counterSubscriber();
    this.toggleSubscriber();
  }

  controllerSubscriber() {
    this.subscriptions.set(
      'controller',
      this.ControllerService.contollers$.subscribe(({ control, algorithm }) => {
        this.pathFinderMatrix.algorithum = algorithm;
        switch (control) {
          case Controls.Play:
            this.pathFinderAnimator.searchAnimation(10)
            .then(_ =>
              this.ControllerService.controls$.next(Controls.Empty)
            );
            break;
          case Controls.Reset:
            this.pathFinderAnimator.resetAnimation();
            break;
          case Controls.Clear:
            this.pathFinderAnimator.resetAnimation();
            this.pathFinderMatrix.clear();
            break;
        }
      })
    );
  }

  counterSubscriber() {
    this.subscriptions.set(
      'counter',
      this.ControllerService.actionCounters$.subscribe((action) => {
        switch (action.title) {
          case 'Rows':
            this.pathFinderMatrix.gridRow(action.value);
            break;
          case 'Columns':
            this.pathFinderMatrix.gridColumn(action.value);
            break;
        }
      })
    );
  }



  toggleSubscriber() {
    this.subscriptions.set(
      'nodeClicker',
      this.nodeClicker$.subscribe((node) => {
        let action = this.ControllerService.action$.value;
        switch (action.title) {
          case 'Start':
            if (
              this.notEnd(node) &&
              this.notBlocked(node) &&
              this.notWaypoint(node)
            ) {
              this.pathFinderMatrix.toggleStart(node);
            }
            break;
          case 'End':
            if (
              this.notStart(node) &&
              this.notBlocked(node) &&
              this.notWaypoint(node)
            ) {
              this.pathFinderMatrix.toggleEnd(node);
            }
            break;
          case 'Wall':
            if (
              this.notStart(node) &&
              this.notEnd(node) &&
              this.notWaypoint(node)
            ) {
              node.toggleBlocked();
            }
            break;
          case 'Waypoint':
            if (this.notStart(node) && this.notEnd(node) && this.notBlocked(node)) {
              this.pathFinderMatrix.waypoint(node);
            }
            break;
          case 'Weight':
            if(action.subscription.value.value == 1) {
              node.increaseWeight()
            }
            if(action.subscription.value.value == -1) {
              node.decreaseWeight()
            }
            break;
        }
      })
    );
  }

  public nodeWeightStyle(node: PathNode) {
    if (node.classes[1] !== '' || node.classes[2] !== '') {
      return { backgroundColor: `rgba(255,255,255,0)` };
    }
    if (node.weightMultipler > 5) {
      let val = (node.weightMultipler - 5) / 10;
      return { backgroundColor: `rgba(100,100,100, ${val})` };
    } else if (node.weightMultipler < 5) {
      let val = Math.abs(node.weightMultipler - 5) / 10;
      return { backgroundColor: `rgba(255,255,255, ${val})` };
    }
  }

  private notStart(node: PathNode): boolean {
    return node !== this.pathFinderMatrix.start;
  }

  private notEnd(node: PathNode): boolean {
    return node !== this.pathFinderMatrix.end;
  }

  private notWaypoint(node: PathNode): boolean {
    const exists = this.pathFinderMatrix.waypoints.find(
      (point) => point.x === node.position.x && point.y === node.position.y
    );
    return exists ? false : true;
  }

  private notBlocked(node: PathNode): boolean {
    return !node.isBlocked;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
    this.subscriptions = new Map();
  }
}
