import { PathNode, Point } from './path-node';

export class PathFinder {
    public grid: PathNode[][];
    public start: PathNode;
    public end: PathNode;
    private width: number;
    private height: number;
  
    constructor(width: number, height: number) {
      this.height = height;
      this.width = width;
      this.createGrid();
    }
  
    public reset(){
      this.grid.map(row => row.forEach(x => {
        if(!x.isBlocked){
          x.parent = null
          x.weighting = null
          x.uncheck()
        }
      }))
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
  
    private setStart(node: PathNode) {
      if (node && !node.isBlocked) {
        this.start = node;
        node.weighting = 0;
        node.check();
        node.classes[1] = 'start';
      }
    }
  
    private removeStart() {
      if(this.start) {
        this.start.uncheck();
        this.start.classes[1] = '';
        this.start = null
      }
    }
  
    public toggleStart(node: PathNode){
      const isStart = node == this.start;
      this.removeStart()
      if(!isStart) {
        this.setStart(node)
      }
    }
  
    private setEnd(node: PathNode) {
      if (node && !node.isBlocked) {
        this.end = node;
        node.classes[1] = 'end';
      }
      return node
    }
  
    private removeEnd() {
      if(this.end) {
        this.end.classes[1] = '';
        this.end = null;
      }
    }
  
    public toggleEnd(node: PathNode){
      const isEnd = node == this.end;
      this.removeEnd()
      if(!isEnd) {
        this.setEnd(node)
      }
    }
  }