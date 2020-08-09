import { GraphPathFinder } from './graph/graph-path-finder';
import { MatrixPathFinder } from './matrix/matrix-path-finder';
import { GraphNode } from './graph/graph';
import { PathNode } from "./matrix/matrix";

export type PathFinder<T> = T extends MatrixPathFinder ? PathNode : T extends GraphPathFinder ? GraphNode : null

export enum Algorithm {
    ASTAR = "A-Star",
    DIJKSTRA = "Dijkstra"
}

export enum SearchType {
  GRAPH = "Graph",
  MATRIX = "Matrix"
}


export interface IPathFinder<T> {
    algorithum: Algorithm,
    reset: () => void;
    showPathGenerator: () => Generator;
    showPathTiming: number;
    noPathGenerator: () => Generator;
    noPathTiming: number;
    resetGenerator: () => Generator;
    resetTiming: number;
    algorithumGenerator: () => Generator;
  }
