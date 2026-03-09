import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('access_token');
  console.log('Interceptor ejecutado, token actual:', token);
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    console.log('Interceptor añadido token:', token);
    return next(cloned);
  }
  
  return next(req);
};