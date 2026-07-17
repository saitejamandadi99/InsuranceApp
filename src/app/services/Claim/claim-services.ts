import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { ClaimResponseDto } from '../../DTO/ClaimResponseDto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ClaimRequestDto } from '../../DTO/ClaimRequestDto';
import { OfficerRemarkRequestDto } from '../../DTO/OfficerRemarkRequest';
import { AdminRemarkRequestDto } from '../../DTO/AdminRemarkRequestDto';

@Injectable({
    providedIn:'root'
})
export class ClaimServices {
    constructor(private http:HttpClient){}
    
    listClaims(pageNumber:number, pageSize:number, sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<ClaimResponseDto>>>{
        const params = new HttpParams().set('pageNumber',pageNumber)
        .set('pageSize',pageSize)
        .set('sortBy',sortBy)
        .set('sortDirection',sortDirection)
        .set('search',search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<ClaimResponseDto>>>(`${environment.apiUrl}/Claim`, {params});
    }

    getClaimById(claimId:number):Observable<SuccessResponseDto<ClaimResponseDto>>{
        return this.http.get<SuccessResponseDto<ClaimResponseDto>>(`${environment.apiUrl}/Claim/${claimId}`);
    }

    getClaimsByCustomerId(customerId:number):Observable<SuccessResponseDto<ClaimResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimResponseDto[]>>(`${environment.apiUrl}/Claim/customer/${customerId}`);
    }

    getClaimsByPolicyId(policyId:number):Observable<SuccessResponseDto<ClaimResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimResponseDto[]>>(`${environment.apiUrl}/Claim/policy/${policyId}`);
    }

    getMyClaims():Observable<SuccessResponseDto<ClaimResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimResponseDto[]>>(`${environment.apiUrl}/Claim/my-claims`);
    }


    raiseClaim(claim:ClaimRequestDto):Observable<SuccessResponseDto<ClaimResponseDto>>{
        return this.http.post<SuccessResponseDto<ClaimResponseDto>>(`${environment.apiUrl}/Claim/raise`,claim);
    }

    officerReviewByClaimId(claimId:number, remarks:OfficerRemarkRequestDto):Observable<SuccessResponseDto<ClaimResponseDto>>{
        return this.http.put<SuccessResponseDto<ClaimResponseDto>>(`${environment.apiUrl}/Claim/officer-review/${claimId}`, remarks)
    }

    adminReviewByClaimId(claimId:number, remarks:AdminRemarkRequestDto):Observable<SuccessResponseDto<ClaimResponseDto>>{
        return this.http.put<SuccessResponseDto<ClaimResponseDto>>(`${environment.apiUrl}/Claim/admin-review/${claimId}`, remarks)
    }
}

