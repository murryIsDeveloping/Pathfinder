import { ControllerService, Action } from './../../services/controller.service';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchType } from '@path-finder/types';

@Component({
  selector: 'app-action-controller',
  templateUrl: './action-controller.component.html',
  styleUrls: ['./action-controller.component.sass'],
})
export class ActionControllerComponent implements OnInit, OnDestroy {
  public actions: Action[] = [];
  public actionActive: Action;

  private actionSubscription: Subscription;

  constructor(private ControllerService: ControllerService) { }

  ngOnInit(): void {
    this.actionSubscription = this.ControllerService.actions$.subscribe((actions) => {
      this.actions = actions;
      this.actionActive = this.actions[0]
      this.ControllerService.action$.next(this.actions[0])
    });
  }

  setAction(action, value = 0) {
    this.actionActive = action;
    this.actionActive.push(value);
    this.ControllerService.action$.next(action)
  }

  setCounter(action, value) {
    action.push(value);
  }

  ngOnDestroy(){
    if(this.actionSubscription){
      this.actionSubscription.unsubscribe();
    }
  }
}
