import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PolicyPlanServices } from '../../../services/PolicyPlan/policy-plan-services';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { PolicyPlanResponseDto } from '../../../DTO/PolicyPlanResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-view-plans-component',
  imports: [ReactiveFormsModule, NgIf,NgFor],
  templateUrl: './view-plans-component.html',
  styleUrl: './view-plans-component.css',
})
export class ViewPlansComponent implements OnInit {
  
  constructor(private planService:PolicyPlanServices){}

  filterForm:FormGroup= new FormGroup({
    search:new FormControl(''),
    sortBy:new FormControl('planName'),
    sortDirection:new FormControl('asc'),
    pageNumber:new FormControl(1),
    pageSize:new FormControl(10)
  });

  searchPlans(){
    this.filterForm.patchValue({
      pageNumber:1,
    });
    this.loadPlans();
  }

  previousPage(){
    if(this.lstPlans &&  this.lstPlans.currentPage>1){
      this.filterForm.patchValue({
        pageNumber:this.lstPlans.currentPage-1
      });
      this.loadPlans();
    }
  }

  nextPage(){
    if(this.lstPlans &&  !this.lstPlans.isLastPage){
      this.filterForm.patchValue({
        pageNumber:this.lstPlans.currentPage+1
      });
      this.loadPlans();
    }
  }

  activatePlan(id:number){
    this.planService.activatePolicyPlan(id).subscribe({
      next:(response)=>{
        alert(response.message)
        this.loadPlans();
      },error:(err:HttpErrorResponse)=>{
        const apiError= err.error as ErrorResponseDto;
        alert(apiError.Message)
      }
    })
  }

   deactivatePlan(id:number){
    this.planService.deactivatePolicyPlan(id).subscribe({
      next:(response)=>{
        alert(response.message)
        this.loadPlans();
      },error:(err:HttpErrorResponse)=>{
        const apiError= err.error as ErrorResponseDto;
        alert(apiError.Message)
      }
    })
  }
  lstPlans!:PaginationResponseDto<PolicyPlanResponseDto>;
  ngOnInit(): void {
      this.loadPlans();
  }

  loadPlans(){
    const filters = this.filterForm.value;

    this.planService.listPolicyPlans(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
      next:(response)=>{
        this.lstPlans=response.data;
      },error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    })
  }
}
