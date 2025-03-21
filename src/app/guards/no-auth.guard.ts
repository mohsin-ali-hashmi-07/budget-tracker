import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  const role = localStorage.getItem('role')
    if (role === 'user') {
      router.navigate(['/home/expense']); 
      return false; 
    } else {
      return true;
    }
};
