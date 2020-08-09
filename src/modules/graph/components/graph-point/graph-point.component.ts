import { GraphNode } from '@path-finder/graph/graph';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  @Input() disableDrag : boolean;

  pointEmitter: BehaviorSubject<GraphNode>;
  pointSubscription: Subscription;
  noLayer:boolean;

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

    if(!val.event.layerX && !val.event.layerX){
      this.noLayer = true;
      return;
    } else {
      this.noLayer = false;
    }

    this.point.position = { x: val.event.layerX ||  val.pointerPosition.x , y: val.event.layerY ||  val.pointerPosition.y}
    this.pointEmitter.next(this.point);
  }

  onFinished(val) {
    if(this.noLayer) {
      this.point.position.x += val.distance.x
      this.point.position.y += val.distance.y
    }
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
