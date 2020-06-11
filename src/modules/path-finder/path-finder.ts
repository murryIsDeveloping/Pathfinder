import { PathNode, Point } from './path-node';

export class PathFinder {
  public gScoreMultiplier = 10;
  public grid: PathNode[][];
  public start: PathNode;
  public end: PathNode;
  private width: number;
  private height: number;
  public waypoints: Point[] = [];
  public theme: string = 'theme-one';

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.createGrid();
  }

  private forEveryNode(func: (node: PathNode) => void) {
    this.grid.forEach((row) => {
      row.forEach((node) => {
        func(node);
      });
    });
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
    this.setStart(this.grid[0][0]);
    this.setEnd(this.grid[this.grid.length - 1][this.grid[0].length - 1]);
  }

  public getNode(position: Point): PathNode {
    return this.grid[position.x] && this.grid[position.x][position.y]
      ? this.grid[position.x][position.y]
      : null;
  }

  public createGrid() {
    this.grid = [];
    for (let i = 0; i < this.height; i++) {
      let row = new Array(this.width).fill(0).map((_) => new PathNode());
      row.forEach((node, index) => node.setPosition(i, index));
      this.grid.push(row);
    }
  }

  public addGridRow() {
    if (this.height < 100) {
      this.height++;
      let row = new Array(this.width).fill(0).map((_) => new PathNode());
      row.forEach((node, index) => node.setPosition(this.height - 1, index));
      this.grid.push(row);
    }
  }

  public removeGridRow() {
    if (this.height > 2) {
      this.height--;
      this.grid.pop();
      this.setStartEnd()
    }
  }

  public addGridColumn() {
    if (this.width < 100) {
      this.width++;
      this.grid.forEach((row, index) => {
        let node = new PathNode();
        node.setPosition(index, this.width - 1);
        row.push(node);
      });
    }
  }

  public removeGridColumn() {
    if (this.width > 2) {
      this.width--;
      this.grid.forEach((row) => {
        row.pop();
      });
      this.setStartEnd()
    }
  }

  public setStartEnd(){
    if(!this.getNode(this.start.position)){
      this.setStart(this.grid[0][0]);
    }
    if(!this.getNode(this.end.position)){
      this.setEnd(this.grid[this.grid.length - 1][this.grid[0].length - 1]);
    }

    console.log(this.start, this.end)
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
