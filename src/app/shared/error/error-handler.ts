import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn
} from "@angular/common/http";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, throwError } from "rxjs";

const BYPASS_ERROR = new HttpContextToken(() => false);
export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _snackBar: MatSnackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (req.context.get(BYPASS_ERROR)) {
        return next(req);
      }

      let message = "";

      if (typeof error?.error?.message === "string") {
        message = error?.error?.message;
      } else if (typeof error?.error?.message?.message === "string") {
        message = error?.error?.message?.message;
      } else {
        message = error?.message;
      }

      const action = "Закрыть";

      _snackBar.open(message, action, {
        duration: 5000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: "mat-snack--danger",
      });

      return throwError(() => error);
    })
  );
};
