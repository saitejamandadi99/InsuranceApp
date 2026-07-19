import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailsComponent } from './document-details-component';

describe('DocumentDetailsComponent', () => {
  let component: DocumentDetailsComponent;
  let fixture: ComponentFixture<DocumentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
