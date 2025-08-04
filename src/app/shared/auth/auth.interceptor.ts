import {
  HttpInterceptorFn
} from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  const token = authService.token;

  if (!token) return next(req);

  let modifiedReq = req.clone({
    setHeaders: {
      Authorization: token,
    },
  });

  return next(modifiedReq);
};
