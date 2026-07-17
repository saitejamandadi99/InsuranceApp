import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchasePolicyRequestDto } from '../../DTO/PurchasePolicyRequestDto';
import { IssuePolicyRequestDto } from '../../DTO/IssuePolicyRequestDto';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { PolicyResponseDto } from '../../DTO/PolicyResponseDto';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class PolicyServices {

    constructor(private http:HttpClient){}

    listPolicies(pageNumber:number, pageSize:number, sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<PolicyResponseDto>>>{
        const params = new HttpParams().set('pageNumber',pageNumber)
                    .set('pageSize',pageSize)
                    .set('sortBy',sortBy)
                    .set('sortDirection',sortDirection)
                    .set('search',search)

        return this.http.get<SuccessResponseDto<PaginationResponseDto<PolicyResponseDto>>>(`${environment.apiUrl}/Policy`,{params});
    }

    purchasePolicy(policy:PurchasePolicyRequestDto):Observable<SuccessResponseDto<PolicyResponseDto>>{
        return this.http.post<SuccessResponseDto<PolicyResponseDto>>(`${environment.apiUrl}/Policy/Purchase`, policy);

    }

    issuePolicy(policy:IssuePolicyRequestDto):Observable<SuccessResponseDto<PolicyResponseDto>>{
        return this.http.post<SuccessResponseDto<PolicyResponseDto>>(`${environment.apiUrl}/Policy/Issue`, policy);
    }

    getPolicyById(id:number):Observable<SuccessResponseDto<PolicyResponseDto>>{
        return this.http.get<SuccessResponseDto<PolicyResponseDto>>(`${environment.apiUrl}/Policy/${id}`);
    }

    getPoliciesByCustomerId(customerId:number):Observable<SuccessResponseDto<PolicyResponseDto[]>>{
        return this.http.get<SuccessResponseDto<PolicyResponseDto[]>>(`${environment.apiUrl}/Policy/customer/${customerId}`);
    }

    getPoliciesByPlanId(planId:number):Observable<SuccessResponseDto<PolicyResponseDto[]>>{
        return this.http.get<SuccessResponseDto<PolicyResponseDto[]>>(`${environment.apiUrl}/Policy/plan/${planId}`);
    }

    cancelPolicy(id:number):Observable<SuccessResponseDto<PolicyResponseDto>>{
        return this.http.put<SuccessResponseDto<PolicyResponseDto>>(`${environment.apiUrl}/Policy/cancel/${id}`, {});
    }

    getMyPolicies():Observable<SuccessResponseDto<PolicyResponseDto[]>>{
        return this.http.get<SuccessResponseDto<PolicyResponseDto[]>>(`${environment.apiUrl}/Policy/my-policies`);
    }
}
