import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlansComponent } from './view-plans-component';

describe('ViewPlansComponent', () => {
  let component: ViewPlansComponent;
  let fixture: ComponentFixture<ViewPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPlansComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPlansComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
