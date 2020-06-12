import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionControllersComponent } from './action-controllers.component';

describe('ActionControllersComponent', () => {
  let component: ActionControllersComponent;
  let fixture: ComponentFixture<ActionControllersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionControllersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
