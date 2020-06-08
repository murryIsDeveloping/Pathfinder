import { Injectable } from '@angular/core';
import { PathFinder } from '../path-finder';
import { BehaviorSubject } from 'rxjs';
import { Algorithm, Algorithms } from '../algorithum';
import { PathNode } from '../path-node';

export enum EventActions {
  BLOCK,
  START,
  END,
  WAYPOINT,
}

@Injectable({
  providedIn: 'root',
})
export class PathFindingService {
  public pathFinder: PathFinder = new PathFinder(30, 20);
  private eventAction: EventActions = EventActions.START;
  public readonly algorithms: Algorithm[] = Algorithms;
  private algorithm$ = new BehaviorSubject(Algorithms[0]);

  constructor() {
    this.pathFinder.toggleStart(this.pathFinder.getNode({ x: 0, y: 0 }));
    this.pathFinder.toggleEnd(this.pathFinder.getNode({ x: 19, y: 29 }));
  }

  public set algorithm(algorithm: Algorithm) {
    this.algorithm$.next(algorithm);
  }

  public get algorithm(): Algorithm {
    return this.algorithm$.value;
  }

  public setAction(eventAction: EventActions) {
    this.eventAction = eventAction;
  }

  public action(node: PathNode) {
    switch (this.eventAction) {
      case EventActions.BLOCK:
        if (
          this.notStart(node) &&
          this.notEnd(node) &&
          this.notWaypoint(node)
        ) {
          node.toggleBlocked();
        }
        break;
      case EventActions.START:
        if (
          this.notEnd(node) &&
          this.notBlocked(node) &&
          this.notWaypoint(node)
        ) {
          this.pathFinder.toggleStart(node);
        }
        break;
      case EventActions.END:
        console.log('Running')
        if (
          this.notStart(node) &&
          this.notBlocked(node) &&
          this.notWaypoint(node)
        ) {
          console.log('Ran')
          this.pathFinder.toggleEnd(node);
        }
        break;
      case EventActions.WAYPOINT:
        if (
          this.notStart(node) &&
          this.notEnd(node) &&
          this.notBlocked(node)
        ) {
          this.pathFinder.waypoint(node);
        }
        break;
      default:
        return
    }
  }

  private notStart(node: PathNode): boolean {
    return node !== this.pathFinder.start;
  }

  private notEnd(node: PathNode): boolean {
    return node !== this.pathFinder.end;
  }

  private notWaypoint(node: PathNode): boolean {
    const exists = this.pathFinder.waypoints.find(
      (point) => point.x === node.position.x && point.y === node.position.y
    );
    return exists ? false : true;
  }

  private notBlocked(node: PathNode): boolean {
    return !node.isBlocked;
  }
}
