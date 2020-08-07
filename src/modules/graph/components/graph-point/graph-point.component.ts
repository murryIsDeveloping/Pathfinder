import { BehaviorSubject, Subscription } from 'rxjs';
import { GraphNode } from './../../graph';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-graph-point',
  templateUrl: './graph-point.component.html',
  styleUrls: ['./graph-point.component.sass']
})
export class GraphPointComponent implements OnInit, OnDestroy {
  @Output() onMoved = new EventEmitter<GraphNode>();
  @Input() point : GraphNode;

  pointEmitter: BehaviorSubject<GraphNode>;
  pointSubscription: Subscription;

  dragPosition = {x: 0, y: 0};
  constructor() { }

  ngOnInit(): void {
    this.dragPosition = {x: this.point.position.x - 15, y: this.point.position.y - 15};
    this.pointEmitter = new BehaviorSubject(this.point);
    this.pointSubscription = this.pointEmitter.pipe(throttleTime(300)).subscribe(val => {
      this.onMoved.emit(this.point);
    });
  }

  moving(val) {
    this.point.position = { x: val.event.layerX, y: val.event.layerY}
    this.pointEmitter.next(this.point);
  }

  onFinished(_) {
    this.onMoved.emit(this.point);
  }


  ngOnDestroy(){
    if(this.pointSubscription) {
    this.pointSubscription.unsubscribe();
    }

    if(this.pointEmitter) {
      this.pointEmitter.unsubscribe();
    }
  }
}
