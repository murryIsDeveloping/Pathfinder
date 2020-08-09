import { GraphPathFinder } from './../graph-path-finder'

export function* resetGenerator(pathFinder: GraphPathFinder) {
    pathFinder.edges.forEach(e => e.class = "");

    for (let node of pathFinder.nodes) {
        node.classes[1] = ""
        yield
    }

    pathFinder.reset();
}