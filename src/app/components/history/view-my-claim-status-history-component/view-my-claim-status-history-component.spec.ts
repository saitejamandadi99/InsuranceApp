import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyClaimStatusHistoryComponent } from './view-my-claim-status-history-component';

describe('ViewMyClaimStatusHistoryComponent', () => {
  let component: ViewMyClaimStatusHistoryComponent;
  let fixture: ComponentFixture<ViewMyClaimStatusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyClaimStatusHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMyClaimStatusHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
