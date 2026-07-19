import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { PolicyResponseDto } from '../../../DTO/PolicyResponseDto';
import { PolicyServices } from '../../../services/Policy/policy-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { Router } from '@angular/router';
import { PolicyStatus } from '../../../models/PolicyStatus';

@Component({
  selector: 'app-view-my-policies-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader, LoadingSpinner, StatusBadge, DatePipe, CurrencyPipe],
  templateUrl: './view-my-policies-component.html',
  styleUrl: './view-my-policies-component.css',
})
export class ViewMyPoliciesComponent implements OnInit {
  
  constructor(private policyService:PolicyServices, private cdr: ChangeDetectorRef, private router:Router){}
  
  lstMyPolicies: PolicyResponseDto[] = [];
  isLoading=false;
  PolicyStatus=PolicyStatus
  ngOnInit(): void {
   this.loadMyPolicies();
  }
  
  loadMyPolicies(){
     this.isLoading=true;
      this.policyService.getMyPolicies().subscribe({
        next:(response)=>{
          this.lstMyPolicies = response.data ?? [];
          this.isLoading=false;
          alert(response.message);
          this.cdr.detectChanges();
        },error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }

  navigateToPurchasePolicy(){
  this.router.navigate(['/purchasepolicy']);
}

navigateToMakePayment(policyId: number) {
  this.router.navigate(['/makepayment', policyId]);
}

navigateToRaiseClaim(policyId: number) {
  this.router.navigate(['/raiseclaim', policyId]);
}

}
