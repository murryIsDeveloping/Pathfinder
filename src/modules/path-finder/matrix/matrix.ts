export type Point = {
    x: number;
    y: number;
  };

  export class PathNode {
    public weightMultipler: number = 5;
    public position: Point;
    public blocked: boolean = false;
    private checked: boolean = false;
    public weighting: number;
    public gScore: number;
    public parent: PathNode;
    public classes: string[] = ['', '', ''];

    constructor() {}

    public check() {
      this.classes[0] = 'checked';
      this.checked = true;
    }

    public uncheck() {
      this.classes[0] = '';
      this.classes[2] = '';
      this.checked = false;
    }

    public get isChecked() {
      return this.checked;
    }

    public toggleBlocked() {
      this.blocked = !this.blocked;
      this.classes[1] = this.blocked ? 'blocked' : '';
    }

    public get isBlocked() {
      return this.blocked;
    }

    public setPosition(x: number, y: number) {
      this.position = { x, y };
    }

    public path(): PathNode[] {
      if (this.parent) {
        return this.parent.path().concat(this);
      }
      return [this];
    }

    public getWeightMultipler(){
      const scaledWeight = this.weightMultipler - 5;
      return scaledWeight >= 0 ? scaledWeight + 1 : 0.5**Math.abs(scaledWeight)
    }

    public increaseWeight() {
      if (this.weightMultipler < 10) {
        this.weightMultipler++;
      }
    }

    public decreaseWeight() {
      if (this.weightMultipler > 1) {
        this.weightMultipler--;
      }
    }
  }

  export class Matrix {
    public grid: PathNode[][];
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
      this.height = height;
      this.width = width;
      this.createGrid();
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
      }
    }

    public get start(){
      return this.grid[0][0]
    }

    public get end(){
      return this.grid[this.grid.length - 1][this.grid[0].length - 1]
    }

  }

