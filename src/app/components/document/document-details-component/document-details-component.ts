import { DatePipe, NgIf, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';

import { ClaimDocumentServices } from '../../../services/ClaimDocument/claim-document-services';
import { ClaimDocumentResponseDto } from '../../../DTO/ClaimDocumentResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-document-details-component',
  standalone: true,
  imports: [NgIf, DatePipe, PageHeader, LoadingSpinner],
  templateUrl: './document-details-component.html',
  styleUrl: './document-details-component.css',
})
export class DocumentDetailsComponent implements OnInit {

  documentId!: number;
  document!: ClaimDocumentResponseDto;
  isLoading = true;

  constructor(
    private documentServices: ClaimDocumentServices,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.documentId = Number(this.activatedRoute.snapshot.params['documentId']);

    if (isNaN(this.documentId)) {
      this.location.back();
      return;
    }

    this.loadDocument();
  }

  loadDocument() {
    this.isLoading = true;

    this.documentServices.getClaimDocumentsById(this.documentId).subscribe({
      next: (response) => {
        this.document = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      },
    });
  }

  goBack() {
    this.location.back();
  }
}