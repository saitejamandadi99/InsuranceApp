import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerProfileComponent } from './edit-customer-profile-component';

describe('EditCustomerProfileComponent', () => {
  let component: EditCustomerProfileComponent;
  let fixture: ComponentFixture<EditCustomerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCustomerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCustomerProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
