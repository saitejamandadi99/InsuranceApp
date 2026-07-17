import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanComponent } from './edit-plan-component';

describe('EditPlanComponent', () => {
  let component: EditPlanComponent;
  let fixture: ComponentFixture<EditPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPlanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
