import { Component, OnInit, AfterViewInit } from '@angular/core';
import { forEach } from 'ramda';

class GraphPoint {
  constructor(
    public id: number, 
    public position: {
      x: number,
      y: number,
    },
  ){}
}

class GraphEdge {
  distance: number;

  constructor(
    public pointA: GraphPoint,
    public pointB: GraphPoint,
  ){
    this.distance = calcDistance(this.pointA, this.pointB)
  }
}

function calcDistance(pointA: GraphPoint, pointB: GraphPoint) : number {
  var x = Math.abs(pointA.position.x - pointB.position.x);
  var y = Math.abs(pointA.position.y - pointB.position.y);
  return Math.sqrt(y**2 + x**2);
}



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {

  points: GraphPoint[] = [
    new GraphPoint(1, {x: 15, y: 15}),
    new GraphPoint(2, {x: 15, y: 60}),
    new GraphPoint(3, {x: 80, y: 100}),
    new GraphPoint(4, {x: 100, y: 140}),
  ];

  edges: GraphEdge[] = [];

  constructor() { }

  ngOnInit (): void {
    this.points.forEach(node =>  {
      this.addEdges(node);
    });

    console.log(this.edges);
  }


  onMoved(val) {
    this.filterEdges(val);
    this.addEdges(val);
  }

  filterEdges(node: GraphPoint){
    this.edges = this.edges.filter(edge => edge.pointA == node || edge.pointB == node);
  }

  allEdges(){
    this.points.forEach(node =>  {
      this.addEdges(node);
    });
  }

  addEdges(node: GraphPoint){
    this.points.forEach(n => {
      if(node.id != n.id){
        if (calcDistance(node, n) <= 100) {
          this.edges.push(new GraphEdge(node, n))
        }
      }
    });
  }
}
