import { MatrixPathFinder } from './../matrix-path-finder';

export function* resetGenerator(pathFinder: MatrixPathFinder) {
    for(let row of pathFinder.matrix.grid) {
      for(let cell of row) {
        if(!cell.isBlocked){
          cell.parent = null
          cell.weighting = null
          cell.gScore = null
          cell.uncheck()
        }
        cell.classes[2] = ''
      }
      yield 
    }
  }