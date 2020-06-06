import { PathNode } from '../path-node';
import { PathFinder } from '../path-finder';

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
  
      if(!nextNode){
        return null
      }
  
      nextNode.check();
      currentNode = nextNode;
      yield nextNode;
    }
  
    return null;
  }
  