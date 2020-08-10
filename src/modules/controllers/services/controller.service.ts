import { BehaviorSubject, Subject, Observable, Subscription, merge } from 'rxjs';
import { Algorithm, SearchType } from '@path-finder/types';
import { Injectable, OnDestroy } from '@angular/core';
import { map, withLatestFrom, mergeMap, skipWhile } from 'rxjs/operators';

export enum Controls { Play = "Play", Reset = "Reset", Clear = "Clear", Empty = "Empty" }
export enum GraphActions { AddPoint = "Add Point", RemovePoint = "Remove Point" }
export enum MatrixActions { Start = "Start", End = "End", Wall = "Wall", Waypoint = "Waypoint", PointWeight = "PointWeight" }
export enum GridActions { Column}

export class Action {
  subscription: BehaviorSubject<{title: String, value: number}>;

  constructor(
    public title: string,
    public type: 'Toggle' | 'Toggle Counter' | 'Counter',
    public message: string = null
  ) {
    this.subscription = new BehaviorSubject({ title: this.title, value: 0 });
  }

  push(value: number) {
    this.subscription.next({
      title: this.title,
      value
    })
  }

  static Toggle(title: string, message:string = null) {
    return new this(title, 'Toggle', message);
  }

  static ToggleCounter(title: string, message:string = null) {
    return new this(title, 'Toggle Counter', message);
  }

  static Counter(title: string,message:string = null) {
    return new this(title, 'Counter', message);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ControllerService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public alorithm$: BehaviorSubject<Algorithm> = new BehaviorSubject(Algorithm.DIJKSTRA);
  public searchType$: BehaviorSubject<SearchType> = new BehaviorSubject(SearchType.MATRIX);
  public controls$: BehaviorSubject<Controls> = new BehaviorSubject(Controls.Empty);
  public contollers$: Observable<{ algorithm: Algorithm, control: Controls }> = this.controls$.pipe(
    map((control) => ({ control, algorithm: this.alorithm$.value }))
  )

  private graphActions: Action[] = [
    Action.Toggle('Move'),
    Action.Toggle('Add', "max 250"),
    Action.Toggle('Remove'),
  ];

  private matrixActions: Action[] = [
    Action.Toggle('Start'),
    Action.Toggle('End'),
    Action.Toggle('Wall'),
    Action.Toggle('Waypoint'),
    Action.ToggleCounter('Weight'),
    Action.Counter('Rows', 'max 100'),
    Action.Counter('Columns', 'max 100'),
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

  controllerAction(actionTitle: string, action: Function, value: { title: String; value: number;} = null){
    if(this.controls$.value === Controls.Play){
      return;
    }

    if ((value ? value.title : this.action$.value.title) === actionTitle) {
      action()
    }
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

