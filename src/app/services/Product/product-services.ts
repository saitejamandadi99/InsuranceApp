import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { ProductRequestDto } from '../../DTO/ProductRequestDto';
import { Observable } from 'rxjs';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';
import { ProductResponseDto } from '../../DTO/ProductResponseDto';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class ProductServices {

    constructor(private http:HttpClient){}

    listProducts(pageNumber:number,pageSize:number,sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<ProductResponseDto>>>{
        const params = new HttpParams().set('pageNumber', pageNumber)
                                    .set('pageSize', pageSize)
                                    .set('sortBy', sortBy)
                                    .set('sortDirection', sortDirection)
                                    .set('search', search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<ProductResponseDto>>>(`${environment.apiUrl}/InsuranceProduct`, {params})
    }

    getProductById(id:number):Observable<SuccessResponseDto<ProductResponseDto>>{
        return this.http.get<SuccessResponseDto<ProductResponseDto>>(`${environment.apiUrl}/InsuranceProduct/${id}`)    }

    addProduct(product:ProductRequestDto):Observable<SuccessResponseDto<ProductResponseDto>>{
        return this.http.post<SuccessResponseDto<ProductResponseDto>>(`${environment.apiUrl}/InsuranceProduct`, product)
    }

    updateProduct(id:number, product:ProductRequestDto):Observable<SuccessResponseDto<ProductResponseDto>>{
        return this.http.put<SuccessResponseDto<ProductResponseDto>>(`${environment.apiUrl}/InsuranceProduct/${id}`, product)
    }

    activateProduct(id:number):Observable<SuccessResponseDto<ProductResponseDto>>{
        return this.http.put<SuccessResponseDto<ProductResponseDto>>(`${environment.apiUrl}/InsuranceProduct/Activate/${id}`, {})    
    }


    deactivateProduct(id:number):Observable<SuccessResponseDto<ProductResponseDto>>{
        return this.http.put<SuccessResponseDto<ProductResponseDto>>(`${environment.apiUrl}/InsuranceProduct/Deactivate/${id}`, {})    
    }


}
