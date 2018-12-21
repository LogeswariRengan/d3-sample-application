import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayeredDonutComponent } from './layered-donut.component';

describe('LayeredDonutComponent', () => {
  let component: LayeredDonutComponent;
  let fixture: ComponentFixture<LayeredDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayeredDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayeredDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
