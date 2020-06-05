import { Component, OnInit, Inject, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { PathFinder, findPathGenerator, showPathGenerator, PathNode, noPathGenerator, resetGenerator } from '../path-node';
import { interval, Subscription } from 'rxjs';
import { EventActions } from '../controllers/controllers.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
  public pathFinder: PathFinder = new PathFinder(30, 20);
  private actionType: EventActions;
  private animationSubscription: Subscription;
  public noPath: boolean;

  constructor() { }

  ngOnInit(): void {
    this.pathFinder.toggleStart(this.pathFinder.getNode({x: 0, y: 0}))
    this.pathFinder.toggleEnd(this.pathFinder.getNode({x: 19, y: 29}))
  }

  public action($event: EventActions){
    this.actionType = $event;
    console.log(this.actionType)
    switch($event) {
      case EventActions.RUN:
        this.animationUnsubscribe();
        this.findAnimation()
        break;
      case EventActions.RESET:
        this.animationUnsubscribe();
        this.pathFinder.reset()
        break;
      default:
        return 
    }

  }

  private animationUnsubscribe(){
    if(this.animationSubscription){
      this.animationSubscription.unsubscribe()
    }
  }

  public findAnimation(){
    this.pathFinder.reset()
    const findPath = findPathGenerator(this.pathFinder)
    const animationTimer$ = interval(10);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = findPath.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
        if (!next.value) {
          this.noPathAnimation()
          return
        }
        const showPath = showPathGenerator(next.value)
        this.pathAnimation(showPath)
      }
    });
  }

  public noPathAnimation(){
    const noPath = noPathGenerator(this.pathFinder)
    const animationTimer$ = interval(15);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = noPath.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
        this.noPath = true;
        setTimeout(() => {
          this.resetAnimation()
          this.noPath = false
        }, 3000)
      }
    });
  }

  public resetAnimation(){
    const reset = resetGenerator(this.pathFinder)
    const animationTimer$ = interval(15);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = reset.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
      }
    });
  }

  public pathAnimation(generator: Generator<PathNode, PathNode>){
    const animationTimer$ = interval(150);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = generator.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
      }
    });
  }


  public runAction(node: PathNode){
    switch(this.actionType) {
      case EventActions.START:
        this.pathFinder.toggleStart(node)
        break;
      case EventActions.END:
        this.pathFinder.toggleEnd(node)
        break;
      case EventActions.BLOCK:
        if(node !== this.pathFinder.end && node !== this.pathFinder.start)
        node.toggleBlocked()
        break;
      default:
        return 
    }
  }

}
