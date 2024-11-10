import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanMatchFn = (route, segments): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const role = authService.getMemberRole();
    if (role === 'admin' && segments[0].path === 'dashboard') {
      return true;
    } else if (role !== 'admin' && segments[0].path === 'member-dashboard') {
      return true;
    } else {
      // Redirect based on role if they try to access the wrong dashboard
      return role === 'admin'
        ? router.parseUrl('/dashboard')
        : router.parseUrl('/member-dashboard');
    }
  } else {
    // Redirect to login if the user is not logged in
    return router.parseUrl('/login');
  }
};
