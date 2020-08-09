import { GraphPathFinder } from './../graph-path-finder';

export function* showPathGenerator(pathFinder: GraphPathFinder) {
    let node = pathFinder.end;
    let nodes = [node];
    while(node.parent) {
      node = node.parent
      nodes.push(node)
    }
  
    nodes.reverse();
    for (let node of nodes){
      node.active = true;
      node.classes[1] = "active";
      let edge = pathFinder.edge(node, node.parent)
      if(edge){
          edge.class = "active";
      }
      yield node
    }
  
    return node;
  }
  
  