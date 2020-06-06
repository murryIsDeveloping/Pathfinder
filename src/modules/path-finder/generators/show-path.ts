import { PathNode } from '../path-node';

export function* showPathGenerator(node: PathNode) {
    const path = node.path();
    for (let i = 0; i < path.length; i++) {
      path[i].classes[0] = 'active';
      yield path[i]
    }
  
    return path[path.length-1];
  }