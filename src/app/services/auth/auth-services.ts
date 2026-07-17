import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequestDto } from "../../DTO/LoginRequestDto";
import { Observable } from "rxjs";
import { LoginResponseDto } from "../../DTO/LoginResponseDto";
import { environment } from "../../../environments/environment";
import { RegisterRequestDto } from "../../DTO/RegisterRequestDto";
import { RegisterResponseDto } from "../../DTO/RegisterResponseDto";
import { Role } from "../../models/Role";

@Injectable({
    providedIn:'root',
})
export class AuthServices {
    constructor(private http:HttpClient){}

    //loginUser
    loginUser(loginrequest : LoginRequestDto):Observable<LoginResponseDto>{
        return this.http.post<LoginResponseDto>(`${environment.apiUrl}/Auth/login`, loginrequest);
    }

    registerUser(registerrequest:RegisterRequestDto):Observable<RegisterResponseDto>{
        return this.http.post<RegisterResponseDto>(`${environment.apiUrl}/Auth/register`, registerrequest);
    }

    saveToken(response:LoginResponseDto){
        localStorage.setItem("token", response.jwtToken);
        localStorage.setItem("role", response.userRole);
        localStorage.setItem("userEmail", response.userEmail);
        const payloadBase64 =  response.jwtToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64)) //ascii to binary

        localStorage.setItem("fullName", decodedPayload["fullName"]);
        localStorage.setItem("userId", decodedPayload["userId"]);
        
    }

    getFullName():string{
        return String(localStorage.getItem("fullName"));
    }

    getUserEmail():string{
        return String(localStorage.getItem("userEmail"));
    }

    getUserId():number{
        return Number(localStorage.getItem("userId"));
    }

    getToken():string|null{
        return localStorage.getItem("token");
    }

    getRole():Role|null{
        return localStorage.getItem("role") as Role | null;
    }

    isLoggedIn():boolean{
        var token = localStorage.getItem('token');
        return token !== null;
    }

    logout(){
        localStorage.removeItem('fullName');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
    }

}
