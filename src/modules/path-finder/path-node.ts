type Point = {
  x: number;
  y: number;
};

export class PathNode {
  public position: Point;
  private blocked: boolean = false;
  private checked: boolean = false;
  public weighting: number;
  public parent: PathNode;
  public classes: string[] = ['', ''];

  constructor() {}

  public check() {
    this.classes[0] = 'checked';
    this.checked = true;
  }

  public uncheck(){
    this.classes[0] = '';
    this.checked = false;
  }

  public get isChecked() {
    return this.checked;
  }

  public toggleBlocked() {
    this.blocked = !this.blocked;
    this.classes[0] = this.blocked ? 'blocked' : ''
  }

  public get isBlocked() {
    return this.blocked;
  }

  public setPosition(x: number, y: number) {
    this.position = { x, y };
  }

  public path(): PathNode[] {
    if (this.parent) {
      return this.parent.path().concat(this)
    } 
    return [this]
  }
}

export class PathFinder {
  public grid: PathNode[][];
  public start: PathNode;
  public end: PathNode;

  constructor(width: number, height: number) {
    this.createGrid(width, height);
  }

  public reset(){
    this.grid.map(row => row.forEach(x => {
      if(!x.isBlocked){
        x.uncheck()
      }
    }))
  }

  public getNode(position: Point): PathNode {
    return this.grid[position.x] && this.grid[position.x][position.y]
      ? this.grid[position.x][position.y]
      : null;
  }

  public createGrid(width: number, height: number) {
    this.grid = [];
    for (let i = 0; i < height; i++) {
      let row = new Array(width).fill(0).map((_) => new PathNode());
      row.forEach((node, index) => node.setPosition(i, index));
      this.grid.push(row);
    }
  }

  private setStart(node: PathNode) {
    if (node) {
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
    if (node) {
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

export function* showPathGenerator(node: PathNode) {
  const path = node.path();
  for (let i = 0; i < path.length; i++) {
    path[i].classes[0] = 'active';
    yield path[i]
  }

  // while (node.parent) {
  //   node.parent.classes[1] = 'end';
  //   node.parent.classes[0] = 'active';
  //   node = node.parent;
  //   yield node;
  // }

  return path[path.length-1];
}

export function* findPathGenerator(pathFinder: PathFinder) {
  let { start, end } = pathFinder;

  if (!start || !end ) {
    return null
  }

  let currentNode = start;
  currentNode.weighting = 0;
  currentNode.check();

  let nextNodes: Set<PathNode> = new Set([currentNode]);

  while (nextNodes.size > 0) {
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        let weighting = a === 0 || b === 0 ? 10 : 15;
        let node = pathFinder.getNode({
          x: currentNode.position.x + a,
          y: currentNode.position.y + b,
        });

        if (node === end) {
          node.parent = currentNode;
          return node;
        }

        if (node && !node.isBlocked && !node.isChecked) {
          let weight = weighting + currentNode.weighting;
          if (!node.weighting || weight < node.weighting) {
            node.weighting = weight;
            node.parent = currentNode;
          }
          nextNodes.add(node);
        }
      }
    }

    nextNodes.delete(currentNode);
    let nextNode;
    nextNodes.forEach((x) => {
      if (!nextNode || x.weighting < nextNode.weighting) {
        nextNode = x;
      }
    });
    nextNode.check();
    currentNode = nextNode;
    yield nextNode;
  }

  return currentNode;
}
