import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { ClaimDocumentResponseDto } from '../../DTO/ClaimDocumentResponseDto';
import { environment } from '../../../environments/environment';
import { ClaimDocumentRequestDto } from '../../DTO/ClaimDocumentRequestDto';

@Injectable({
    providedIn:'root'
})
export class ClaimDocumentServices {
    constructor(private http:HttpClient){}

    listClaimDocuments(pageNumber:number, pageSize:number, sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<ClaimDocumentResponseDto>>>{
        const params = new HttpParams().set('pageNumber', pageNumber)
        .set('pageSize', pageSize)
        .set('sortBy', sortBy)
        .set('sortDirection', sortDirection)
        .set('search', search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<ClaimDocumentResponseDto>>>(`${environment.apiUrl}/ClaimDocument`, {params})
    }

    addClaimDocument(document: ClaimDocumentRequestDto):Observable<SuccessResponseDto<ClaimDocumentResponseDto>>{
        return this.http.post<SuccessResponseDto<ClaimDocumentResponseDto>>(`${environment.apiUrl}/ClaimDocument`, document);
    }

    getClaimDocumentsById(id:number):Observable<SuccessResponseDto<ClaimDocumentResponseDto>>{
        return this.http.get<SuccessResponseDto<ClaimDocumentResponseDto>>(`${environment.apiUrl}/ClaimDocument/${id}`)
    }


    deleteClaimDocumentById(id:number):Observable<SuccessResponseDto<void>>{
        return this.http.delete<SuccessResponseDto<void>>(`${environment.apiUrl}/ClaimDocument/${id}`)
    }

    getClaimDocumentsByClaimId(claimId:number):Observable<SuccessResponseDto<ClaimDocumentResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimDocumentResponseDto[]>>(`${environment.apiUrl}/ClaimDocument/claim/${claimId}`)
    }

    getClaimDocumentsByCustomerId(customerId:number):Observable<SuccessResponseDto<ClaimDocumentResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimDocumentResponseDto[]>>(`${environment.apiUrl}/ClaimDocument/customer/${customerId}`)
    }

    getMyClaimDocuments():Observable<SuccessResponseDto<ClaimDocumentResponseDto[]>>{
        return this.http.get<SuccessResponseDto<ClaimDocumentResponseDto[]>>(`${environment.apiUrl}/ClaimDocument/my-documents`)
    }

}
