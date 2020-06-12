import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContollersComponent } from './grid-contollers.component';

describe('GridContollersComponent', () => {
  let component: GridContollersComponent;
  let fixture: ComponentFixture<GridContollersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridContollersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridContollersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
