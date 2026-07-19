import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyDocumentsComponent } from './view-my-documents-component';

describe('ViewMyDocumentsComponent', () => {
  let component: ViewMyDocumentsComponent;
  let fixture: ComponentFixture<ViewMyDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyDocumentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMyDocumentsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
