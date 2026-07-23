import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';

import { ClaimServices } from '../../../services/Claim/claim-services';
import { ClaimDocumentServices } from '../../../services/ClaimDocument/claim-document-services';
import { ClaimResponseDto } from '../../../DTO/ClaimResponseDto';
import { ClaimStatus } from '../../../models/ClaimStatus';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-add-claim-document-component',
  standalone:true,
  imports: [ReactiveFormsModule, NgIf, NgFor, PageHeader, LoadingSpinner],
  templateUrl: './add-claim-document-component.html',
  styleUrl: './add-claim-document-component.css',
})
export class AddClaimDocumentComponent implements OnInit {

  documentForm: FormGroup = new FormGroup({
    claimId: new FormControl('', [Validators.required]),
    documentName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    documentType: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });

  constructor(private claimServices: ClaimServices,private documentServices: ClaimDocumentServices,private router: Router,private cdr: ChangeDetectorRef, private toastServices:ToastServices) {}

  claims: ClaimResponseDto[] = [];
  selectedFiles: File[] = [];
  filesTouched = false;

  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.claimServices.getMyClaims().subscribe({
      next: (response) => {
        this.claims = response.data.filter(
          (claim) => claim.claimStatus !== ClaimStatus.Approved && claim.claimStatus !== ClaimStatus.Rejected
        );
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

  onFilesSelected(event: Event) {
    this.filesTouched = true;
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = [...this.selectedFiles, ...Array.from(input.files)];
    }

    input.value = '';
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  addDocument() {
    this.filesTouched = true;
    if (this.selectedFiles.length === 0) {
      return;
    }
    this.isLoading = true;
    const formValue = this.documentForm.value;
    const formData = new FormData();
    formData.append('claimId', formValue.claimId);
    formData.append('documentName', formValue.documentName);
    formData.append('documentType', formValue.documentType);

    this.selectedFiles.forEach((file) => {
      formData.append('Files', file, file.name);
    });

    this.documentServices.addClaimDocument(formData).subscribe({
      next: (response) => {
        this.toastServices.success(response.message);
        this.isLoading = false;
        this.router.navigate(['/mydocuments']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const apiError = err.error as ErrorResponseDto;
        this.toastServices.error(apiError.Message);
      },
    });
  }

  get claimId(): FormControl {
    return this.documentForm.get('claimId') as FormControl;
  }

  get documentName(): FormControl {
    return this.documentForm.get('documentName') as FormControl;
  }

  get documentType(): FormControl {
    return this.documentForm.get('documentType') as FormControl;
  }

  navigateToMyDocuments() {
    this.router.navigate(['/mydocuments']);
  }
}