import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPaymentsComponent } from './view-my-payments-component';

describe('ViewMyPaymentsComponent', () => {
  let component: ViewMyPaymentsComponent;
  let fixture: ComponentFixture<ViewMyPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyPaymentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMyPaymentsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
