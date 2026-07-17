import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { PaymentResponseDto } from '../../DTO/PaymentResponseDto';
import { environment } from '../../../environments/environment';
import { PaymentRequestDto } from '../../DTO/PaymentRequestDto';

@Injectable({
    providedIn:'root'
})
export class PaymentServices {
    constructor(private http:HttpClient){}

    listPayments(pageNumber:number,pageSize:number, sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<PaymentResponseDto>>>{
        const params = new HttpParams().set('pageNumber',pageNumber)
        .set('pageSize',pageSize)
        .set('sortBy',sortBy)
        .set('sortDirection',sortDirection)
        .set('search', search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<PaymentResponseDto>>>(`${environment.apiUrl}/Payment`, {params});
    }

    getPaymentById(id:number):Observable<SuccessResponseDto<PaymentResponseDto>>{
        return this.http.get<SuccessResponseDto<PaymentResponseDto>>(`${environment.apiUrl}/Payment/${id}`);
    }

    getPaymentsByCustomerId(customerId:number):Observable<SuccessResponseDto<PaymentResponseDto[]>>{
        return this.http.get<SuccessResponseDto<PaymentResponseDto[]>>(`${environment.apiUrl}/Payment/customer/${customerId}`);

    }

    getMyPayments():Observable<SuccessResponseDto<PaymentResponseDto[]>>{
        return this.http.get<SuccessResponseDto<PaymentResponseDto[]>>(`${environment.apiUrl}/Payment/my-payments`);

    }

    getPaymentsByPolicyId(policyId:number):Observable<SuccessResponseDto<PaymentResponseDto[]>>{
        return this.http.get<SuccessResponseDto<PaymentResponseDto[]>>(`${environment.apiUrl}/Payment/policy/${policyId}`);

    }

    addMyPayment(payment:PaymentRequestDto):Observable<SuccessResponseDto<PaymentResponseDto>>{
        return this.http.post<SuccessResponseDto<PaymentResponseDto>>(`${environment.apiUrl}/Payment/my-payment`, payment);
    }

    addOfficerPayment(payment:PaymentRequestDto):Observable<SuccessResponseDto<PaymentResponseDto>>{
        return this.http.post<SuccessResponseDto<PaymentResponseDto>>(`${environment.apiUrl}/Payment/officer-payment`, payment);
    }
}
