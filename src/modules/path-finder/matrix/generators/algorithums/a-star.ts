import { PathNode } from './../../matrix';
import { MatrixPathFinder, Theme } from "../../matrix-path-finder";

export function* aStarGenerator(pathFinder: MatrixPathFinder) {
  let { start, end } = pathFinder;
  let path: PathNode[] = [];

  if (!start || !end) {
    return null;
  }

  const nextWaypoint = nextWaypointFunction(pathFinder);
  let waypoint = nextWaypoint();

  let currentNode = start;
  currentNode.weighting = 0;
  currentNode.check();

  let nextNodes: Set<PathNode> = new Set([currentNode]);

  while (nextNodes.size > 0) {
    let hitwaypoint = false;
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        let weighting = a === 0 || b === 0 ? 10 : 15;
        let node = pathFinder.getNode({
          x: currentNode.position.x + a,
          y: currentNode.position.y + b,
        });

        if (node && node === waypoint) {
          node.parent = currentNode;
          path.push(...node.path());
          pathFinder.reset();
          waypoint = nextWaypoint();
          currentNode = node;
          currentNode.weighting = 0;
          currentNode.check();
          nextNodes.clear();
          nextNodes.add(currentNode);
          hitwaypoint = true
          continue;
        }

        if (!waypoint && node === end) {
          node.parent = currentNode;
          path.push(...node.path());
          pathFinder.path = path;
          return path;
        }

        if (node && !node.isBlocked && !node.isChecked) {
          let weight = (weighting * node.getWeightMultipler()) + currentNode.weighting;
          if (!node.weighting || weight < node.weighting) {
            node.weighting = weight;
            node.parent = currentNode;
          }
          nextNodes.add(node);
        }
      }
    }

    if(hitwaypoint){
        hitwaypoint = false
        continue
    }

    nextNodes.delete(currentNode);
    let nextNode;
    nextNodes.forEach((node) => {
      if (!nextNode || (node.weighting + node.gScore) < (nextNode.weighting + nextNode.gScore)) {
        nextNode = node;
      }
    });

    if (!nextNode) {
      return null;
    }

    nextNode.check();
    currentNode = nextNode;
    yield nextNode;
  }

  return null;
}

function nextWaypointFunction(pathFinder: MatrixPathFinder) {
  const themes : Theme[] = ['theme-one', 'theme-two', 'theme-three']
  const waypoints = JSON.parse(JSON.stringify(pathFinder.waypoints));
  return () => {
    pathFinder.theme = themes[waypoints.length % 3]
    let point = waypoints.shift();

    if(point){
      let node = pathFinder.getNode(point);
      pathFinder.setGScore(node);
      return node
    } else {
        pathFinder.setGScore(pathFinder.end);
        return null
    }
  };
}
