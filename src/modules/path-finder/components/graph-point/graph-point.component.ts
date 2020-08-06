import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';

type GraphPointRef = {
  id: number,
  position: {x: number, y: number},
}

@Component({
  selector: 'app-graph-point',
  templateUrl: './graph-point.component.html',
  styleUrls: ['./graph-point.component.sass']
})
export class GraphPointComponent implements OnInit {
  @Output() onMoved = new EventEmitter<GraphPointRef>();
  @Input() point : GraphPointRef;

  dragPosition = {x: 0, y: 0};
  constructor() { }

  ngOnInit(): void {
    this.dragPosition = {x: this.point.position.x - 15, y: this.point.position.y - 15};
  }

  moving(val) {
    this.point.position = { x: val.event.layerX, y: val.event.layerY}
  }

  onFinished(_) {
    this.onMoved.emit(this.point);
  }
}
