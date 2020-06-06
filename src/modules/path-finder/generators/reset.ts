import { PathFinder } from '../path-finder'

export function* resetGenerator(pathFinder: PathFinder) {
    for(let row of pathFinder.grid) {
      for(let cell of row) {
        if(!cell.isBlocked){
          cell.parent = null
          cell.weighting = null
          cell.uncheck()
        }
        cell.classes[2] = ''
      }
      yield 
    }
  }