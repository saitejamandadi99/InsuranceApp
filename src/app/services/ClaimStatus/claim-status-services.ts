import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { ClaimStatusHistoryResponseDto } from '../../DTO/ClaimStatusHistoryResponseDto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class ClaimStatusServices {
    constructor(private http:HttpClient){}
    listClaimStatusHistories(pageNumber:number, pageSize:number,sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<ClaimStatusHistoryResponseDto>>>{
        const params = new HttpParams().set('pageNumber', pageNumber)
        .set('pageSize', pageSize)
        .set('sortBy', sortBy)
        .set('sortDirection', sortDirection)
        .set('search', search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<ClaimStatusHistoryResponseDto>>>(`${environment.apiUrl}/ClaimStatusHistory`, {params});
    }

    getClaimStatusHistoryByClaimId(claimId:number):Observable<SuccessResponseDto<ClaimStatusHistoryResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimStatusHistoryResponseDto[]>>(`${environment.apiUrl}/ClaimStatusHistory/claim/${claimId}`);
    }

    getClaimStatusHistoryByCustomerId(customerId:number):Observable<SuccessResponseDto<ClaimStatusHistoryResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimStatusHistoryResponseDto[]>>(`${environment.apiUrl}/ClaimStatusHistory/customer/${customerId}`);
    }

    getMyClaimStatusHistory():Observable<SuccessResponseDto<ClaimStatusHistoryResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimStatusHistoryResponseDto[]>>(`${environment.apiUrl}/ClaimStatusHistory/my-history`);
    }
}
