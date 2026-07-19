import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentsComponent } from './view-payments-component';

describe('ViewPaymentsComponent', () => {
  let component: ViewPaymentsComponent;
  let fixture: ComponentFixture<ViewPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPaymentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPaymentsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
