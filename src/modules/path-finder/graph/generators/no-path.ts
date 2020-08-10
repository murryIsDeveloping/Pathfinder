import { GraphPathFinder } from './../graph-path-finder'

export function* noPathGenerator(pathFinder: GraphPathFinder) {
    for (let node of pathFinder.nodes) {
        node.classes[1] = "no-path"
        yield
    }
}
