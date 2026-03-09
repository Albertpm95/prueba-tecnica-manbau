// loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(
    delay(2000),
    // finalize se ejecuta tanto si la petición va bien como si falla
    finalize(() => loadingService.hide()),
  );
};
