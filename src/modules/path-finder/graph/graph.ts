export class GraphNode {
    start: boolean = false;
    end: boolean = false;
    checked: boolean = false;
    active: boolean = false;
    weighting: number = Infinity;
    parent: GraphNode;
    gScore: number = 0;
    classes: string[] = ["", ""];

    constructor(
      public id: number,
      public position: {
        x: number,
        y: number,
      },
    ){}

    reset(){
      this.checked = false;
      this.active  = false;
      this.weighting = Infinity;
      this.parent = null;
      this.classes = ["", ""];
    }
  };

  export class GraphEdge {
    class = ""
    distance: number;

    constructor(
      public pointA: GraphNode,
      public pointB: GraphNode,
    ) {
      this.distance = calcDistance(this.pointA, this.pointB)
    }
  }

  export function calcDistance(pointA: GraphNode, pointB: GraphNode): number {
    var x = Math.abs(pointA.position.x - pointB.position.x);
    var y = Math.abs(pointA.position.y - pointB.position.y);
    return Math.sqrt(y ** 2 + x ** 2);
  }

