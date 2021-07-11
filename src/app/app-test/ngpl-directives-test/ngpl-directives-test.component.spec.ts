import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplDirectivesTestComponent } from './ngpl-directives-test.component';

describe('SkeletonTestComponent', () => {
  let component: NgplDirectivesTestComponent;
  let fixture: ComponentFixture<NgplDirectivesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplDirectivesTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplDirectivesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
