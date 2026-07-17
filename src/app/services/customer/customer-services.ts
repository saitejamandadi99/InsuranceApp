import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { CustomerResponseDto } from '../../DTO/CustomerResponseDto';
import { environment } from '../../../environments/environment';
import { CustomerRequestDto } from '../../DTO/CustomerRequestDto';

@Injectable({
    providedIn:'root'
})
export class CustomerServices {
    constructor(private http:HttpClient){}

    listCustomers(pageNumber:number, pageSize:number, sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<CustomerResponseDto>>>{

        const params = new HttpParams().set('pageNumber', pageNumber)
                                        .set('pageSize', pageSize)
                                        .set('sortBy', sortBy)
                                        .set('sortDirection', sortDirection)
                                        .set('search', search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<CustomerResponseDto>>>(`${environment.apiUrl}/Customer`, {params});

    }

    addCustomerProfile(customer:CustomerRequestDto):Observable<SuccessResponseDto<CustomerResponseDto>>{
        return this.http.post<SuccessResponseDto<CustomerResponseDto>>(`${environment.apiUrl}/Customer`,customer);
    }

    updateCustomerProfile(customer:CustomerRequestDto):Observable<SuccessResponseDto<CustomerResponseDto>>{
        return this.http.put<SuccessResponseDto<CustomerResponseDto>>(`${environment.apiUrl}/Customer`,customer);
    }

    getMyProfile():Observable<SuccessResponseDto<CustomerResponseDto>>{
        return this.http.get<SuccessResponseDto<CustomerResponseDto>>(`${environment.apiUrl}/Customer/Profile`);
    }

    getCustomerDetailsById(id:number):Observable<SuccessResponseDto<CustomerResponseDto>>{
        return this.http.get<SuccessResponseDto<CustomerResponseDto>>(`${environment.apiUrl}/Customer/${id}`);
    }

    getCustomerDetailsByUserId(userId:number):Observable<SuccessResponseDto<CustomerResponseDto>>{
        return this.http.get<SuccessResponseDto<CustomerResponseDto>>(`${environment.apiUrl}/Customer/User/${userId}`);
    }

    

}
