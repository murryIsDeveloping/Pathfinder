import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPointComponent } from './graph-point.component';

describe('GraphPointComponent', () => {
  let component: GraphPointComponent;
  let fixture: ComponentFixture<GraphPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
