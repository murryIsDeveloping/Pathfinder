import { MatrixPathFinder } from './../matrix-path-finder';

export function* showPathGenerator(pathFinder: MatrixPathFinder) {
    const nodePath = pathFinder.path;

    for (let i = 0; i < nodePath.length; i++) {
        nodePath[i].classes[2] = 'active';
      yield nodePath[i]
    }
  
    return nodePath[nodePath.length-1];
  }