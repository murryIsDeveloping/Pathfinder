import { GraphNode } from './../../graph';
import { GraphPathFinder } from '../../graph-path-finder';


export function* desktraGenerator(pathFinder: GraphPathFinder) {
    const { start, end } = pathFinder;
    let currentNode = start;
    currentNode.checked = true;
    currentNode.weighting = 0;

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

            if(!nextNode || val.weighting < nextNode.weighting) {
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
        nextNode.classes[0] = "checked";

        yield nextNode;
        possibleNodes.delete(nextNode);
        currentNode = nextNode;
    }
}
