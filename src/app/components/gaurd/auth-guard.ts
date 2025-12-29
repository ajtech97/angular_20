import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLocaldata = localStorage.getItem("loginName");
  const router = inject(Router);
  if (isLocaldata == null) {
    // alert("Please login to access the page");
    router.navigateByUrl('/login');
    return true;
  } else {
    return true;
  }
};
