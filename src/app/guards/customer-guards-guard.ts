import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth/auth-services';
import { Role } from '../models/Role';

export const customerGuardsGuard: CanActivateFn = (route, state) => {
  const service= inject(AuthServices);
  const router= inject(Router);
  const token = service.getToken();
  const role = service.getRole();
  if(!token){
    alert('Please Login.')
    router.navigate(['login']);
    return false;
  }
  if(role===Role.Customer){
    return true;
  }

  alert("You are not authorized to access this page.");
  router.navigate(['unauthorized']);
  return false;
};
