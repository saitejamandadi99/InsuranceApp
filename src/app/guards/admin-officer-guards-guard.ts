import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth/auth-services';
import { Role } from '../models/Role';

export const adminOfficerGuardsGuard: CanActivateFn = (route, state) => {
  const service=inject(AuthServices);
  const router = inject(Router);
  const role = service.getRole();
  const token = service.getToken();
if(!token){
    alert("Please Login")
    router.navigate(['login']);
    return false;
  }

  if(role===Role.Admin || role === Role.Officer){
    return true;
  }
  alert("You are not authorized to access this page.");
  router.navigate(['unauthorized'])
  return false;
};
