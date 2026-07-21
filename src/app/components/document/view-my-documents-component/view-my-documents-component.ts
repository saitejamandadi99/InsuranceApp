import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { ClaimDocumentServices } from '../../../services/ClaimDocument/claim-document-services';
import { ClaimDocumentResponseDto } from '../../../DTO/ClaimDocumentResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-view-my-documents-component',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, PageHeader, LoadingSpinner, SearchBox, ActionButtons, EmptyState,FilterCard],
  templateUrl: './view-my-documents-component.html',
  styleUrl: './view-my-documents-component.css',
})
export class ViewMyDocumentsComponent implements OnInit {

  documents: ClaimDocumentResponseDto[] = [];
  filteredDocuments: ClaimDocumentResponseDto[] = [];

  isLoading = true;
  searchControl = new FormControl('');

  constructor(private documentServices: ClaimDocumentServices,private router: Router,private cdr: ChangeDetectorRef, private toastServices:ToastServices) {}

  ngOnInit(): void {
    this.loadDocuments();

    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  loadDocuments() {
    this.isLoading = true;

    this.documentServices.getMyClaimDocuments().subscribe({
      next: (response) => {
        this.documents = response.data;
        this.applyFilter();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const apiError = err.error as ErrorResponseDto;
        this.toastServices.error(apiError.Message);
      },
    });
  }

  applyFilter() {
    const term = (this.searchControl.value ?? '').trim().toLowerCase();

    this.filteredDocuments = !term ? this.documents: this.documents.filter(
          (doc) =>
            doc.documentName.toLowerCase().includes(term) ||
            doc.documentType.toLowerCase().includes(term) ||
            doc.claimNumber.toLowerCase().includes(term)
        );
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  onDocAction(action: string, documentId: number) {
    if (action === 'view') {
      this.router.navigate(['/documentdetails', documentId]);
    } else if (action === 'delete') {
      this.deleteDocument(documentId);
    }
  }

  deleteDocument(documentId: number) {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    this.documentServices.deleteClaimDocumentById(documentId).subscribe({
      next: (response) => {
        this.toastServices.info(response.message);
        this.loadDocuments();
      },
      error: (err: HttpErrorResponse) => {
        const apiError = err.error as ErrorResponseDto;
        this.toastServices.error(apiError.Message);
      },
    });
  }

  navigateToAddDocument() {
    this.router.navigate(['/adddocument']);
  }
}