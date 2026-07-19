import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePolicyComponent } from './issue-policy-component';

describe('IssuePolicyComponent', () => {
  let component: IssuePolicyComponent;
  let fixture: ComponentFixture<IssuePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuePolicyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuePolicyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
