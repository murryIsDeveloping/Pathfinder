import { IPathFinder } from './types';
import { interval, Subscription } from 'rxjs';

export class PathFinderAnimator<T> {
  public isRunning = false;
  private animationSubscription: Subscription
  public noPath: boolean;

  constructor(public pathFinder: IPathFinder<T>) { }

  public searchAnimation(searchTiming: number) {
    this.isRunning = true;
    this.animationUnsubscribe();
    this.pathFinder.reset();
    const findPath = this.pathFinder.algorithumGenerator();
    const animationTimer$ = interval(searchTiming);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = findPath.next()
      if (next.done) {
        this.animationSubscription.unsubscribe()
        if (!next.value) {
          this.noPathAnimation()
          return
        }
        const showPath = this.pathFinder.showPathGenerator()
        this.pathAnimation(showPath)
      }
    });
  }

  private noPathAnimation() {
    console.log('Got to noPathAnimation')
    const noPath = this.pathFinder.noPathGenerator()
    const animationTimer$ = interval(this.pathFinder.noPathTiming);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = noPath.next()
      if (next.done) {
        this.animationSubscription.unsubscribe()
        this.noPath = true;
        setTimeout(() => {
          this.resetAnimation()
          this.noPath = false
          this.isRunning = false
        }, 3000)
      }
    });
  }

  public resetAnimation() {
    this.animationUnsubscribe();
    const reset = this.pathFinder.resetGenerator()
    const animationTimer$ = interval(this.pathFinder.resetTiming);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = reset.next()
      if (next.done) {
        this.animationSubscription.unsubscribe()
        this.isRunning = false
      }
    });
  }

  public pathAnimation(generator: Generator) {
    const animationTimer$ = interval(this.pathFinder.showPathTiming);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = generator.next()
      if (next.done) {
        this.animationSubscription.unsubscribe()
        this.isRunning = false
      }
    });
  }

  private animationUnsubscribe() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe()
    }
  }
}
