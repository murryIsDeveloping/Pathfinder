import { Component, OnInit } from '@angular/core';
import { PathFinder, findPathGenerator, showPathGenerator, PathNode } from '../path-node';
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
    const animationTimer$ = interval(20);
    this.animationSubscription = animationTimer$.subscribe((_) => {
      let next = findPath.next()
      if (next.done){
        this.animationSubscription.unsubscribe()
        const showPath = showPathGenerator(next.value)
        this.pathAnimation(showPath)
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
        node.toggleBlocked()
        break;
      default:
        return 
    }
  }

}
