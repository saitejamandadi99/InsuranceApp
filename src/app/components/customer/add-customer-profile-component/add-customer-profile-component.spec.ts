import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerProfileComponent } from './add-customer-profile-component';

describe('AddCustomerProfileComponent', () => {
  let component: AddCustomerProfileComponent;
  let fixture: ComponentFixture<AddCustomerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomerProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
