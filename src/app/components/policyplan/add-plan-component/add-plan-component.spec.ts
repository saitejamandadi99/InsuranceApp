import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanComponent } from './add-plan-component';

describe('AddPlanComponent', () => {
  let component: AddPlanComponent;
  let fixture: ComponentFixture<AddPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
