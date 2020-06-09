import { PathFinder } from './path-finder';

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
