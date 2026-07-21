import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PolicyServices } from '../../../services/Policy/policy-services';
import { CustomerServices } from '../../../services/customer/customer-services';
import { Router } from '@angular/router';
import { PolicyPlanServices } from '../../../services/PolicyPlan/policy-plan-services';
import { CustomerResponseDto } from '../../../DTO/CustomerResponseDto';
import { PolicyPlanResponseDto } from '../../../DTO/PolicyPlanResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { IssuePolicyRequestDto } from '../../../DTO/IssuePolicyRequestDto';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { minDate } from '@angular/forms/signals';
import { ActiveStatus } from '../../../models/ActiveStatus';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-issue-policy-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader, LoadingSpinner],
  templateUrl: './issue-policy-component.html',
  styleUrl: './issue-policy-component.css',
})
export class IssuePolicyComponent implements  OnInit {
  constructor(private policyService:PolicyServices, private planService:PolicyPlanServices, private cusService:CustomerServices, private cdr:ChangeDetectorRef, private router:Router, private toastServices:ToastServices){}
  lstCustomers: CustomerResponseDto[]=[];
  lstPlans:PolicyPlanResponseDto[]=[];
  isLoading=false;
  today!:string;
  maxDate!:string;

  issuePolicyForm:FormGroup= new FormGroup({
    customerId:new FormControl('', [Validators.required]),
    planId:new FormControl('', [Validators.required]),
    startDate:new FormControl('', [Validators.required, this.validateStartDate])
  });




  loadCustomers(){
    this.isLoading=true;
    this.cusService.listCustomers(1,99,'email', 'asc', '').subscribe({
      next:(response)=>{
        this.lstCustomers=response.data?.records ?? [];
        this.isLoading=false;
        this.cdr.detectChanges(); 
      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        const apiError = err.error as ErrorResponseDto;
        this.toastServices.error(apiError.Message);
      }
    })  
  }

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
        this.toastServices.error(apiError.Message);
      }
    })  
  }

  ngOnInit(): void {

    const today = new Date();
    this.today = today.toISOString().split('T')[0];

    const max = new Date();
    max.setDate(max.getDate() + 100);
    this.maxDate = max.toISOString().split('T')[0];
    this.loadCustomers();
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

  issuePolicy(){
    this.isLoading=true;
      const request : IssuePolicyRequestDto=this.issuePolicyForm.value;
      this.policyService.issuePolicy(request).subscribe({
        next:(response)=>{
          this.isLoading=false;
          this.toastServices.info(response.message);
          this.router.navigate(['/viewpolicies']);
        },error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError= err.error as ErrorResponseDto;
          this.toastServices.error(apiError.Message);
        }
      })
  }

  navigateToPolicies(){
    this.router.navigate(['/viewpolicies']);
  }

  get customerId() : FormControl{
    return this.issuePolicyForm.get('customerId') as FormControl;
  }

  
  get planId() : FormControl{
    return this.issuePolicyForm.get('planId') as FormControl;
  }

  
  get startDate() : FormControl{
    return this.issuePolicyForm.get('startDate') as FormControl;
  }
}
