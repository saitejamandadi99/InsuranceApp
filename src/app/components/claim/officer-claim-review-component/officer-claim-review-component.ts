import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';

import { ClaimServices } from '../../../services/Claim/claim-services';

import { ClaimResponseDto } from '../../../DTO/ClaimResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { OfficerRemarkRequestDto } from '../../../DTO/OfficerRemarkRequestDto';
import { ClaimStatus } from '../../../models/ClaimStatus';

@Component({
  selector: 'app-officer-claim-review-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    DatePipe,
    PageHeader,
    LoadingSpinner,
    StatusBadge,
    CurrencyPipe, DatePipe
  ],
  templateUrl: './officer-claim-review-component.html',
  styleUrl: './officer-claim-review-component.css'
})
export class OfficerClaimReviewComponent implements OnInit {

  claimId!: number;

  claim!: ClaimResponseDto;

  isLoading = false;

  claimStatus = ClaimStatus;

  reviewForm: FormGroup = new FormGroup({

    claimStatus: new FormControl('', [
      Validators.required
    ]),

    officerRemarks: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(300)
    ])

  });

  constructor(
    private claimService: ClaimServices,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.claimId = Number(this.activatedRoute.snapshot.params['claimId']);

    if (isNaN(this.claimId)) {
      this.router.navigate(['/viewclaims']);
      return;
    }

    this.loadClaim();

  }

  loadClaim() {

    this.isLoading = true;

    this.claimService.getClaimById(this.claimId).subscribe({

      next: (response) => {

        this.claim = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();

      },

      error: (err: HttpErrorResponse) => {

        this.isLoading = false;

        const apiError = err.error as ErrorResponseDto;

        alert(apiError.Message);

      }

    });

  }

  reviewClaim() {

  this.isLoading = true;

  const request: OfficerRemarkRequestDto = this.reviewForm.value;

  this.claimService.officerReviewByClaimId(this.claimId, request).subscribe({

    next: (response) => {

      this.isLoading = false;

      alert(response.message);

      this.router.navigate(['/claims']);

    },

    error: (err: HttpErrorResponse) => {

      this.isLoading = false;

      const apiError = err.error as ErrorResponseDto;

      alert(apiError.Message);

    }

  });

}

  navigateToClaims() {

    this.router.navigate(['/claims']);

  }

}