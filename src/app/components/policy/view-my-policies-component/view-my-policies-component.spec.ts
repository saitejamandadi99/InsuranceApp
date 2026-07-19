import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPoliciesComponent } from './view-my-policies-component';

describe('ViewMyPoliciesComponent', () => {
  let component: ViewMyPoliciesComponent;
  let fixture: ComponentFixture<ViewMyPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyPoliciesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMyPoliciesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
