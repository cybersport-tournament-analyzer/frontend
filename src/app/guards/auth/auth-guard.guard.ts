import {CanActivateFn, } from '@angular/router';
import { RedirectCommand, Route, Router, UrlTree } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/http.authService';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService); // Внедряем сервис

  console.log(authService.isLoggedIn())
  if (authService.isLoggedIn()) {
    return true;
  }
  return router.navigate(['error']);

};
