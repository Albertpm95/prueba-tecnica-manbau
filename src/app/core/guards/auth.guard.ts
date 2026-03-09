// core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasRole()) {
    return true;
  }

  // Si no tiene rol, redirigimos a login usando el Router de Angular
  // Esto evita que la app se quede en un limbo y recargue
  return router.parseUrl('');
};
