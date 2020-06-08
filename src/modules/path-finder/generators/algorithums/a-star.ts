import { PathNode } from '../../path-node';
import { PathFinder } from '../../path-finder';

export function* aStarGenerator(pathFinder: PathFinder) {
  let gScoreMultiplier = 2;
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
          return path;
        }

        if (node && !node.isBlocked && !node.isChecked) {
          let weight = weighting + currentNode.weighting + (node.gScore * gScoreMultiplier);
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
    nextNodes.forEach((x) => {
      if (!nextNode || x.weighting < nextNode.weighting) {
        nextNode = x;
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

function nextWaypointFunction(pathFinder: PathFinder) {
  const themes = ['theme-one', 'theme-two', 'theme-three']
  const waypoints = JSON.parse(JSON.stringify(pathFinder.waypoints));
  return () => {
    pathFinder.theme = themes[waypoints.length % 3]
    let point = waypoints.shift();

    if(point){
        pathFinder.setGScore(point);
        return pathFinder.getNode(point)
    } else {
        pathFinder.setGScore(pathFinder.end);
        return null
    }
  };
}
