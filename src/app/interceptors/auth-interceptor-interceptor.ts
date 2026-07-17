import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServices } from '../services/auth/auth-services';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(AuthServices);
  const token = service.getToken();
  if(token){
    const cloned = req.clone({
      setHeaders:{
      Authorization: `Bearer ${token}`
      }

    });
    return next(cloned);
  }
  console.log('Token not found');
  
  return next(req);
};
