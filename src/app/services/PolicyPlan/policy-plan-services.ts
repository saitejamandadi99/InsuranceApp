import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PolicyPlanRequestDto } from '../../DTO/PolicyPlanRequestDto';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { PolicyPlanResponseDto } from '../../DTO/PolicyPlanResponseDto';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class PolicyPlanServices {
    constructor(private http:HttpClient){}

    listPolicyPlans(pageNumber:number,pageSize:number,sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<PolicyPlanResponseDto>>>{
        const params = new HttpParams().set('pageNumber', pageNumber)
                                    .set('pageSize', pageSize)
                                    .set('sortBy', sortBy)
                                    .set('sortDirection', sortDirection)
                                    .set('search', search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<PolicyPlanResponseDto>>>(`${environment.apiUrl}/PolicyPlan`,{params});
    }

    addPolicyPlan(policyPlan:PolicyPlanRequestDto):Observable<SuccessResponseDto<PolicyPlanResponseDto>>{
        return this.http.post<SuccessResponseDto<PolicyPlanResponseDto>>(`${environment.apiUrl}/PolicyPlan`, policyPlan);
    }

    updatePolicyPlan(id:number, policyPlan:PolicyPlanRequestDto):Observable<SuccessResponseDto<PolicyPlanResponseDto>>{
        return this.http.put<SuccessResponseDto<PolicyPlanResponseDto>>(`${environment.apiUrl}/PolicyPlan/${id}`, policyPlan);
    }

    getPolicyPlanById(id:number):Observable<SuccessResponseDto<PolicyPlanResponseDto>>{
        return this.http.get<SuccessResponseDto<PolicyPlanResponseDto>>(`${environment.apiUrl}/PolicyPlan/${id}`);
    }

    getPolicyPlanByProductId(productId:number):Observable<SuccessResponseDto<PolicyPlanResponseDto[]>>{
        return this.http.get<SuccessResponseDto<PolicyPlanResponseDto[]>>(`${environment.apiUrl}/PolicyPlan/Product/${productId}`);
    }

    activatePolicyPlan(id:number):Observable<SuccessResponseDto<PolicyPlanResponseDto>>{
        return this.http.put<SuccessResponseDto<PolicyPlanResponseDto>>(`${environment.apiUrl}/PolicyPlan/Activate/${id}`, {});
    }

    deactivatePolicyPlan(id:number):Observable<SuccessResponseDto<PolicyPlanResponseDto>>{
        return this.http.put<SuccessResponseDto<PolicyPlanResponseDto>>(`${environment.apiUrl}/PolicyPlan/Deactivate/${id}`, {});
    }
}
