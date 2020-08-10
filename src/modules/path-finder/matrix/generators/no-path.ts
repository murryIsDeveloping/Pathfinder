import { PathFinder } from './../../types';
import { MatrixPathFinder } from './../matrix-path-finder';

export function* noPathGenerator(pathFinder: MatrixPathFinder) {
    for(let row of pathFinder.matrix.grid) {
      for(let cell of row) {
        cell.classes[2] = 'no-path'
      }
      yield
    }

    pathFinder.theme = "theme-one"
  }
