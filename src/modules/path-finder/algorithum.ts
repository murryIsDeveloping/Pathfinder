import { PathFinder } from './path-finder'
import { PathNode } from './path-node'
import { findPathGenerator, aStarGenerator } from './generators'

export type Algorithm = {
  name: string,
  generator: (pathfinder: PathFinder) => Generator<any, PathNode[], unknown>,
}

export const Algorithms: Algorithm[] = [
  {
    name: 'Dijkstra',
    generator: findPathGenerator
  },
  {
    name: 'A-Star',
    generator: aStarGenerator
  }
];
