import { PathNode, Point } from './path-node';
import { Matrix } from './matrix';

export class PathFinder {
  public gScoreMultiplier = 10;
  public matrix: Matrix;
  public start: PathNode;
  public end: PathNode;
  public waypoints: Point[] = [];
  public theme: string = 'theme-one';

  constructor(matrix: Matrix) {
    this.matrix = matrix;
    this.setStart(matrix.start);
    this.setEnd(matrix.end);
  }

  private forEveryNode(func: (node: PathNode) => void) {
    for(let row of this.matrix.grid) {
      for(let cell of row) {
        func(cell);
      };
    };
  }

  public setStartEndIfMissing(){
    let start = false;
    let end = false;

    this.forEveryNode(node => {
      if (node === this.start) {
        start = true;
      }

      if(node === this.end) {
        end = true;
      }
    });

    console.log('end', end)

    if (!start) {
      this.setStart(this.matrix.start)
    }

    if(!end) {
      this.setEnd(this.matrix.end);
    }
  }

  public reset() {
    this.forEveryNode((node) => {
      node.classes[1];
      if (!node.isBlocked) {
        node.gScore = null;
        node.parent = null;
        node.weighting = null;
        node.uncheck();
      }
    });
  }

  public clear() {
    this.forEveryNode((node) => {
      node.classes = ['', '', ''];
      node.blocked = false;
      node.gScore = null;
      node.parent = null;
      node.weighting = null;
      node.uncheck();
    });
    this.waypoints = [];
    this.setStart(this.matrix.start);
    this.setEnd(this.matrix.end);
  }

  public getNode(position: Point): PathNode {
    return this.matrix.grid[position.x] && this.matrix.grid[position.x][position.y]
      ? this.matrix.grid[position.x][position.y]
      : null;
  }

  public setStartEnd(){
    if(!this.getNode(this.start.position)){
      this.setStart(this.matrix.start);
    }
    if(!this.getNode(this.end.position)){
      this.setEnd(this.matrix.end);
    }
  }

  private setStart(node: PathNode) {
    if (node && !node.isBlocked) {
      this.start = node;
      node.weighting = 0;
      node.check();
      node.classes[1] = 'start';
    }
  }

  private removeStart() {
    if (this.start) {
      this.start.uncheck();
      this.start.classes[1] = '';
      this.start = null;
    }
  }

  public toggleStart(node: PathNode) {
    const isStart = node == this.start;
    this.removeStart();
    if (!isStart) {
      this.setStart(node);
    }
  }

  private setEnd(node: PathNode) {
    if (node && !node.isBlocked) {
      this.end = node;
      node.classes[1] = 'end';
    }
    return node;
  }

  private removeEnd() {
    if (this.end) {
      this.end.classes[1] = '';
      this.end = null;
    }
  }

  public toggleEnd(node: PathNode) {
    const isEnd = node == this.end;
    this.removeEnd();
    if (!isEnd) {
      this.setEnd(node);
    }
  }

  public waypoint(node: PathNode) {
    const { x, y } = node.position;
    let exists = this.waypoints.find(
      (waypoint) => waypoint.x === x && waypoint.y === y
    );
    if (exists) {
      node.classes[1] = '';
      this.waypoints = this.waypoints.filter(
        (waypoint) => !(waypoint.x === x && waypoint.y === y)
      );
    } else {
      node.classes[1] = 'waypoint';
      this.waypoints.push({ x, y });
    }
  }

  public setGScore(endpoint: PathNode) {
    this.forEveryNode((pathNode) => {
      let xScore = Math.abs(endpoint.position.x - pathNode.position.x);
      let yScore = Math.abs(endpoint.position.y - pathNode.position.y);
      pathNode.gScore =
        Math.round(Math.sqrt(xScore ** 2 + yScore ** 2)) *
        this.gScoreMultiplier;
    });
  }
}
