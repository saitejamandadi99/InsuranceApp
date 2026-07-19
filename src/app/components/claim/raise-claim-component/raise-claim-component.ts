import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { ClaimServices } from '../../../services/Claim/claim-services';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimRequestDto } from '../../../DTO/ClaimRequestDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PolicyResponseDto } from '../../../DTO/PolicyResponseDto';
import { PolicyServices } from '../../../services/Policy/policy-services';

@Component({
  selector: 'app-raise-claim-component',
  imports: [ReactiveFormsModule,NgIf, PageHeader, LoadingSpinner],
  templateUrl: './raise-claim-component.html',
  styleUrl: './raise-claim-component.css',
})
export class RaiseClaimComponent implements OnInit {
  raiseClaimForm: FormGroup = new FormGroup({
    claimAmount:new FormControl('', [Validators.required, Validators.min(1)]),
    claimReason:new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    incidentDate:new FormControl('', [Validators.required, this.validateIncidentDate]),
    documentReferences:new FormControl('', [Validators.required])
  });

  isLoading=false;
  policyId!:number;
  today!:string;
  policy!:PolicyResponseDto;

  validateIncidentDate(control:AbstractControl):ValidationErrors | null{
    if(!control.value){
      return null;
    }

    const selectedDate = new Date(control.value);
    selectedDate.setHours(0,0,0,0);

    const today = new Date();
    today.setHours(0,0,0,0);

    if(selectedDate > today){
      return {futureDate:true};
    }
    return null;
  }

  constructor(private claimServices:ClaimServices, private router:Router, private activatedRoute:ActivatedRoute, private cdr:ChangeDetectorRef, private policyService:PolicyServices){}

  ngOnInit(): void {
    this.isLoading=true;
     this.policyId = Number(this.activatedRoute.snapshot.params['policyId']);

     if (isNaN(this.policyId)) {
      this.router.navigate(['/mypolicies']);return;
    }


     const today = new Date();
     this.today = today.toISOString().split('T')[0];

     this.isLoading=true;

     this.policyService.getPolicyById(this.policyId).subscribe({
      next:(response)=>{
        this.policy=response.data;
        this.isLoading=false;
        this.cdr.detectChanges();
      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        const apiError= err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
     })
  }


  raiseClaim(){
    this.isLoading=true;
    const request:ClaimRequestDto = this.raiseClaimForm.value;
    request.policyId = this.policyId;
    
    const documentReferences: string = this.raiseClaimForm.value.documentReferences ?? '';

    request.documentReferences = documentReferences.split('\n').map(reference => reference.trim()).filter(reference => reference.length > 0);
    this.claimServices.raiseClaim(request).subscribe({
      next:(response)=>{
        this.isLoading=false;
        alert(response.message);
        this.router.navigate(['/myclaims']);
      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        const apiError=err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    })
  }

  navigateToMyPolicies(){
  this.router.navigate(['/mypolicies']);
}
}
