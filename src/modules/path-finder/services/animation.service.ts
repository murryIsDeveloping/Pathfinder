import { Injectable } from '@angular/core';
import { PathFinder } from '../path-finder';
import { Algorithm } from '../algorithum';
import { interval, Subscription } from 'rxjs';
import { showPathGenerator, noPathGenerator, resetGenerator } from '../generators';
import { PathNode } from '../path-node';
import { path } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animationSubscription: Subscription
  private noPath: boolean;

  constructor() { }

  public searchAnimation(pathFinder: PathFinder, algorithm: Algorithm){
    this.animationUnsubscribe();
    pathFinder.reset();
    const findPath = algorithm.generator(pathFinder)
    const animationTimer$ = interval(10);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = findPath.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
        if (!next.value) {
          this.noPathAnimation(pathFinder)
          return
        }
        pathFinder.reset()
        const showPath = showPathGenerator(next.value)
        this.pathAnimation(showPath)
      }
    });
  }

  private noPathAnimation(pathFinder: PathFinder){
    const noPath = noPathGenerator(pathFinder)
    const animationTimer$ = interval(15);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = noPath.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
        this.noPath = true;
        setTimeout(() => {
          this.resetAnimation(pathFinder)
          this.noPath = false
        }, 3000)
      }
    });
  }

  public resetAnimation(pathFinder: PathFinder){
    this.animationUnsubscribe();
    const reset = resetGenerator(pathFinder)
    const animationTimer$ = interval(15);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = reset.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
      }
    });
  }

  public pathAnimation(generator: Generator<PathNode, PathNode>){
    const animationTimer$ = interval(50);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = generator.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
      }
    });
  }

  private animationUnsubscribe(){
    if(this.animationSubscription){
      this.animationSubscription.unsubscribe()
    }
  }
}
