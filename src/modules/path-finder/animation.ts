import { IPathFinder } from './types';
import { interval, Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

export class PathFinderAnimator<T> {
  public isRunning = false;
  private animationSubscription: Subscription
  public noPath: boolean;

  constructor(public pathFinder: IPathFinder<T>) { }

  public searchAnimation(searchTiming: number) :Promise<boolean>{
    return new Promise((resolve) => {
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
          }
          const showPath = this.pathFinder.showPathGenerator()
          this.pathAnimation(showPath).then(val => resolve(val))
        }
      });
    });
  }

  private noPathAnimation() {
    const noPath = this.pathFinder.noPathGenerator()
    const animationTimer$ = interval(this.pathFinder.noPathTiming).pipe(
      takeWhile(_ => !noPath.next().done)
    );
    this.animationSubscription = animationTimer$.subscribe(null, null, () => {
      this.animationSubscription.unsubscribe()
      setTimeout(() => {
        this.resetAnimation()
        this.noPath = false
        this.isRunning = false
      }, 3000)
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

  public pathAnimation(generator: Generator): Promise<boolean> {
    return new Promise((resolve) => {
    const animationTimer$ = interval(this.pathFinder.showPathTiming);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = generator.next()
      if (next.done) {
        this.animationSubscription.unsubscribe()
        this.isRunning = false
        resolve(true)
      }
    });
  })
  }

  private animationUnsubscribe() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe()
    }
  }
}
