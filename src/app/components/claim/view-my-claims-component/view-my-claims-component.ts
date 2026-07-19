import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { ClaimResponseDto } from '../../../DTO/ClaimResponseDto';
import { ClaimServices } from '../../../services/Claim/claim-services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-view-my-claims-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader, LoadingSpinner, StatusBadge,ActionButtons, DatePipe, CurrencyPipe],
  templateUrl: './view-my-claims-component.html',
  styleUrl: './view-my-claims-component.css',
})
export class ViewMyClaimsComponent implements OnInit {
  lstMyClaims:ClaimResponseDto[] =[];
  isLoading=false;
  constructor(private claimService:ClaimServices, private router:Router, private cdr:ChangeDetectorRef){}
  
  loadMyClaims(){
    this.isLoading= true;
    this.claimService.getMyClaims().subscribe({
      next:(response)=>{
        this.lstMyClaims=response.data ?? [];
        this.isLoading=false;
        this.cdr.detectChanges();
      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    })
  }

  ngOnInit(): void {
      this.loadMyClaims();
  }

  navigateToRaiseClaims(){
    this.router.navigate(['/raiseclaim'])
  }

  navigateToViewClaimDetails(claimId:number){
    this.router.navigate(['/viewclaimdetails', claimId])
  }

}
