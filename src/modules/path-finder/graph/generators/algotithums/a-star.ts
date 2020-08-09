import { GraphNode } from './../../graph';
import { GraphPathFinder } from "./../../graph-path-finder";

export function* aStarGenerator(pathFinder: GraphPathFinder) {
    const { start, end } = pathFinder;
    let currentNode = start;
    currentNode.checked = true;
    currentNode.weighting = 0;
    pathFinder.setGScore();

    let possibleNodes = new Set<GraphNode>();

    while(true) {
        pathFinder.edges.forEach(edge => {
            if(edge.pointA === currentNode || edge.pointB === currentNode) {
                let otherNode =  edge.pointA === currentNode ? edge.pointB : edge.pointA;
                if(otherNode.weighting > currentNode.weighting + edge.distance && !otherNode.checked) {
                    otherNode.parent = currentNode;
                    otherNode.weighting = currentNode.weighting + edge.distance;
                } 
                possibleNodes.add(otherNode);
            }
        });

        let nextNode: GraphNode;
        possibleNodes.forEach(val => {
            if(val.checked) {
                return
            }

            if(!nextNode || val.weighting + val.gScore < nextNode.weighting + nextNode.gScore) {
                nextNode = val;
            }
        });

        if (!nextNode) {
            return null
        }

        if (nextNode === end) {
            return nextNode;
        }

        nextNode.checked = true;
        nextNode.classes[1] = "checked";

        yield nextNode;
        possibleNodes.delete(nextNode);
        currentNode = nextNode;
    }
}
