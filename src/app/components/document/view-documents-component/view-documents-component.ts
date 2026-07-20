import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { ClaimDocumentServices } from '../../../services/ClaimDocument/claim-document-services';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { ClaimDocumentResponseDto } from '../../../DTO/ClaimDocumentResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-view-documents-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,NgFor, DatePipe, PageHeader, FilterCard, SearchBox, Pagination, LoadingSpinner, EmptyState, ActionButtons],
  templateUrl: './view-documents-component.html',
  styleUrl: './view-documents-component.css',
})
export class ViewDocumentsComponent implements OnInit {

  documents!: PaginationResponseDto<ClaimDocumentResponseDto>;
  isLoading = false;

  filterForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    sortBy: new FormControl('uploadeddate'),
    sortDirection: new FormControl('desc'),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10),
  });

  constructor(
    private documentServices: ClaimDocumentServices,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments() {
    this.isLoading = true;

    const filters = this.filterForm.value;

    this.documentServices
      .listClaimDocuments(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!)
      .subscribe({
        next: (response) => {
          this.documents = response.data;
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

  searchDocuments() {
    this.filterForm.patchValue({ pageNumber: 1 });
    this.loadDocuments();
  }

  clearSearch() {
    this.filterForm.patchValue({ search: '', pageNumber: 1 });
    this.loadDocuments();
  }

  previousPage() {
    if (this.documents && this.documents.currentPage > 1) {
      this.filterForm.patchValue({ pageNumber: this.documents.currentPage - 1 });
      this.loadDocuments();
    }
  }

  nextPage() {
    if (this.documents && !this.documents.isLastPage) {
      this.filterForm.patchValue({ pageNumber: this.documents.currentPage + 1 });
      this.loadDocuments();
    }
  }

  resetFilters() {
    this.filterForm.reset({
      search: '',
      sortBy: 'uploadeddate',
      sortDirection: 'desc',
      pageNumber: 1,
      pageSize: 10,
    });
    this.loadDocuments();
  }

  get searchControl(): FormControl {
    return this.filterForm.get('search') as FormControl;
  }

  navigateToView(documentId: number) {
    this.router.navigate(['/documentdetails', documentId]);
  }
}