import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  public resize$: Observable<{height: number, width: number}> = fromEvent(window, 'resize').pipe(
    throttleTime(200),
    map((val: any) => ({
      height: val.target.innerHeight,
      width:val.target.innerWidth,
    })),
  );

  constructor() { }
}
