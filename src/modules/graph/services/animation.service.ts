import { GraphNode } from './../graph';
import { PathFinderGraph } from './../path-finder-graph';
import { Subscription, interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { desktraGenerator } from './../generators/algotithums/desktra';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  isRunning = false;
  animationSubscription: Subscription;

  constructor() { }

  public searchAnimation(pathFinder: PathFinderGraph){
    this.isRunning = true;
    this.animationUnsubscribe();
    const findPath = desktraGenerator(pathFinder);
    const animationTimer$ = interval(100);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = findPath.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
        if (!next.value) {
          pathFinder.nodes.forEach(node => {
            node.classes[1] = "no-path"
          })
          setTimeout(() => {
            pathFinder.reset();
          }, 3000)
        }
        const showPath = showPathGenerator(pathFinder)
        this.pathAnimation(showPath)
      }
    });
  }

  animationUnsubscribe() {
    if(this.animationSubscription){
      this.animationSubscription.unsubscribe();
    }
  }

  public pathAnimation(generator: Generator<GraphNode, GraphNode>){
    const animationTimer$ = interval(100);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = generator.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
        this.isRunning = false
      }
    });
  }

}

function* showPathGenerator(pathFinder: PathFinderGraph) {
  let node = pathFinder.end;
  let nodes = [node];
  while(node.parent) {
    node = node.parent
    nodes.push(node)
  }

  nodes.reverse();
  for (let node of nodes){
    node.active = true;
    node.classes[0] = "active";
    let edge = pathFinder.edge(node, node.parent)
    if(edge){
        edge.class = "active";
    }
    yield node
  }

  return node;
}

