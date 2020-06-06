import { PathNode } from '../path-node';

export function* showPathGenerator(nodePath: PathNode[]) {
    for (let i = 0; i < nodePath.length; i++) {
        nodePath[i].classes[0] = 'active';
      yield nodePath[i]
    }
  
    return nodePath[nodePath.length-1];
  }