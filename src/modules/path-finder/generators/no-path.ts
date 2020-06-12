import { PathFinder } from '../path-finder'

export function* noPathGenerator(pathFinder: PathFinder) {
    for(let row of pathFinder.matrix.grid) {
      for(let cell of row) {
        cell.classes[2] = 'no-path'
      }
      yield 
    }
  }