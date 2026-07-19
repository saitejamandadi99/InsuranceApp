import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoliciesComponent } from './view-policies-component';

describe('ViewPoliciesComponent', () => {
  let component: ViewPoliciesComponent;
  let fixture: ComponentFixture<ViewPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPoliciesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPoliciesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
