import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PolicyServices } from '../../../services/Policy/policy-services';
import { PolicyPlanServices } from '../../../services/PolicyPlan/policy-plan-services';
import { Router } from '@angular/router';
import { PolicyPlanResponseDto } from '../../../DTO/PolicyPlanResponseDto';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PurchasePolicyRequestDto } from '../../../DTO/PurchasePolicyRequestDto';
import { NgIf } from '@angular/common';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { ActiveStatus } from '../../../models/ActiveStatus';

@Component({
  selector: 'app-purchase-policy-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader, LoadingSpinner],
  templateUrl: './purchase-policy-component.html',
  styleUrl: './purchase-policy-component.css',
})
export class PurchasePolicyComponent implements  OnInit {
  constructor(private policyService:PolicyServices, private planService:PolicyPlanServices, private cdr:ChangeDetectorRef, private router:Router){}
  lstPlans:PolicyPlanResponseDto[]=[];
  isLoading=false;
  today!:string;
  maxDate!:string;

  purchasePolicyForm:FormGroup= new FormGroup({
    planId:new FormControl('', [Validators.required]),
    startDate:new FormControl('', [Validators.required, this.validateStartDate])
  });


  loadPlans(){
    this.isLoading=true;
    this.planService.listPolicyPlans(1,99,'planName', 'asc', '').subscribe({
      next:(response)=>{
        this.lstPlans=(response.data?.records ?? []).filter(plan=>plan.activeStatus === ActiveStatus.Active);
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

    const today = new Date();
    this.today = today.toISOString().split('T')[0];

    const max = new Date();
    max.setDate(max.getDate() + 100);
    this.maxDate = max.toISOString().split('T')[0];
    this.loadPlans();
  }

  validateStartDate(control:AbstractControl):ValidationErrors|null{
    if(!control.value){
      return null;
    }

    const selectedDate = new Date(control.value);
    selectedDate.setHours(0,0,0,0);

    const today = new Date();
    today.setHours(0,0,0,0);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 100);

    if(selectedDate < today){
      return{
        minDate:true
      }
    }

    if(selectedDate > maxDate){
      return{
        maxDate:true
      };
    }
    return null;
  }

  purchasePolicy(){
    this.isLoading=true;
      const request : PurchasePolicyRequestDto=this.purchasePolicyForm.value;
      this.policyService.purchasePolicy(request).subscribe({
        next:(response)=>{
          this.isLoading=false;
          alert(response.message);
          this.router.navigate(['/mypolicies']);
        },error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError= err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }

  navigateToPolicies(){
    this.router.navigate(['/mypolicies']);
  }
  
  get planId() : FormControl{
    return this.purchasePolicyForm.get('planId') as FormControl;
  }

  
  get startDate() : FormControl{
    return this.purchasePolicyForm.get('startDate') as FormControl;
  }
}