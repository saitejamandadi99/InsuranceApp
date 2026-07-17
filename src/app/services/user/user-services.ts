import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequestDto } from '../../DTO/UserRequestDto';
import { UserResponseDto } from '../../DTO/UserResponseDto';
import { environment } from '../../../environments/environment';
import { SuccessResponseDto } from '../../DTO/SuccessResponseDto';
import { PaginationResponseDto } from '../../DTO/PaginationResponseDto';

@Injectable({
    providedIn:'root',
})
export class UserServices {
    constructor(private http:HttpClient){}

    listUsers(pageNumber:number,pageSize:number,sortBy:string, sortDirection:string, search:string):Observable<SuccessResponseDto<PaginationResponseDto<UserResponseDto>>>{
       const params = new HttpParams().set('pageNumber', pageNumber)
                                    .set('pageSize', pageSize)
                                    .set('sortBy', sortBy)
                                    .set('sortDirection', sortDirection)
                                    .set('search', search)
        return this.http.get<SuccessResponseDto<PaginationResponseDto<UserResponseDto>>>(`${environment.apiUrl}/User`, {params});
    }

    postUser(user:UserRequestDto):Observable<SuccessResponseDto<UserResponseDto>>{
        return this.http.post<SuccessResponseDto<UserResponseDto>>(`${environment.apiUrl}/user`, user);
    }

    getUserById(id:number):Observable<SuccessResponseDto<UserResponseDto>>{
        return this.http.get<SuccessResponseDto<UserResponseDto>>(`${environment.apiUrl}/User/${id}`);
    }

    activateUser(id :number):Observable<SuccessResponseDto<UserResponseDto>>{
        return this.http.put<SuccessResponseDto<UserResponseDto>>(`${environment.apiUrl}/User/activate/${id}`,{})
    }

    deactivateUser(id:number):Observable<SuccessResponseDto<UserResponseDto>>{
        return this.http.put<SuccessResponseDto<UserResponseDto>>(`${environment.apiUrl}/User/deactivate/${id}`,{})
    }
}
