import { BehaviorSubject, Subject, Observable, Subscription, merge } from 'rxjs';
import { Algorithm, SearchType } from '@path-finder/types';
import { Injectable, OnDestroy } from '@angular/core';
import { map, withLatestFrom, mergeMap } from 'rxjs/operators';

export enum Controls { Play = "Play", Reset = "Reset", Clear = "Clear" }
export enum GraphActions { AddPoint = "Add Point", RemovePoint = "Remove Point" }
export enum MatrixActions { Start = "Start", End = "End", Wall = "Wall", Waypoint = "Waypoint", PointWeight = "PointWeight" }
export enum GridActions { Column}

export class Action {
  subscription: BehaviorSubject<{title: String, value: number}>;

  constructor(
    public title: string,
    public type: 'Toggle' | 'Toggle Counter' | 'Counter'
  ) {
    this.subscription = new BehaviorSubject({ title: this.title, value: 0 });
  }

  push(value: number) {
    this.subscription.next({
      title: this.title,
      value
    })
  }

  static Toggle(title: string) {
    return new this(title, 'Toggle');
  }

  static ToggleCounter(title: string) {
    return new this(title, 'Toggle Counter');
  }

  static Counter(title: string) {
    return new this(title, 'Counter');
  }
}

@Injectable({
  providedIn: 'root'
})
export class ControllerService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public alorithm$: BehaviorSubject<Algorithm> = new BehaviorSubject(Algorithm.DIJKSTRA);
  public searchType$: BehaviorSubject<SearchType> = new BehaviorSubject(SearchType.MATRIX);
  public controls$: Subject<Controls> = new Subject();
  public contollers$: Observable<{ algorithm: Algorithm, control: Controls }> = this.controls$.pipe(
    map((control) => ({ control, algorithm: this.alorithm$.value }))
  )

  private graphActions: Action[] = [
    Action.Toggle('Move'),
    Action.Toggle('Add'),
    Action.Toggle('Remove'),
  ];

  private matrixActions: Action[] = [
    Action.Toggle('Start'),
    Action.Toggle('End'),
    Action.Toggle('Wall'),
    Action.Toggle('Waypoint'),
    Action.ToggleCounter('Weight'),
    Action.Counter('Rows'),
    Action.Counter('Columns'),
  ];

  public actions$: BehaviorSubject<Action[]> = new BehaviorSubject(this.matrixActions);
  public action$: BehaviorSubject<Action> = new BehaviorSubject(this.actions$.value[0]);

  public actionCounters$ = this.actions$
  .pipe(
    mergeMap((actions) => {
      return merge(
        ...actions
          .filter((a) => a.type === 'Counter')
          .map((a) => a.subscription)
      );
    })
  );

  constructor() {
    this.actionSubscriber();
  }

  actionSubscriber(){
    this.subscriptions.push(this.searchType$.subscribe((type) => {
      if (type === SearchType.GRAPH) {
        this.actions$.next(this.graphActions);
      }

      if (type === SearchType.MATRIX) {
        this.actions$.next(this.matrixActions);
      }
    }));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      if(sub){
        sub.unsubscribe();
      }
    })
    this.subscriptions = [];
  }

}

