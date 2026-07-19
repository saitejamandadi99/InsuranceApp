import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';

import { ClaimServices } from '../../../services/Claim/claim-services';
import { ClaimResponseDto } from '../../../DTO/ClaimResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-view-claim-details-component',
  standalone: true,
  imports: [NgIf,DatePipe,PageHeader,LoadingSpinner,StatusBadge, CurrencyPipe, DatePipe],
  templateUrl: './view-claim-details-component.html',
  styleUrl: './view-claim-details-component.css'
})
export class ViewClaimDetailsComponent implements OnInit {

  claimId!: number;

  claim!: ClaimResponseDto;

  isLoading = false;

  constructor(private claimService: ClaimServices,private activatedRoute: ActivatedRoute,private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.claimId = Number(this.activatedRoute.snapshot.params['claimId']);

    if(isNaN(this.claimId)){
      this.router.navigate(['/myclaims']);
      return;
    }

    this.loadClaim();

  }

  loadClaim(){

    this.isLoading = true;

    this.claimService.getClaimById(this.claimId).subscribe({

      next:(response)=>{

        this.claim = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();

      },

      error:(err:HttpErrorResponse)=>{

        this.isLoading = false;

        const apiError = err.error as ErrorResponseDto;

        alert(apiError.Message);

      }

    });

  }

  navigateToMyClaims(){

    this.router.navigate(['/myclaims']);

  }

}