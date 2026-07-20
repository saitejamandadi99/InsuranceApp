import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaimDocumentComponent } from './add-claim-document-component';

describe('AddClaimDocumentComponent', () => {
  let component: AddClaimDocumentComponent;
  let fixture: ComponentFixture<AddClaimDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClaimDocumentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddClaimDocumentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
