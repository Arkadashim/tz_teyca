import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import {
  IAuthCredentials,
  IAuthResponse,
  IEnvironment,
} from "@tecya/interfaces";
import { Observable, tap } from "rxjs";
import { ENVIRONMENT } from "../../app.config";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private environment = inject<IEnvironment>(ENVIRONMENT);
  private http = inject(HttpClient);
  private token: string | null = null;

  login(credentials: IAuthCredentials): Observable<any> {
    return this.http
      .post<IAuthResponse>(this.environment.testApiUrl, credentials)
      .pipe(
        tap((response) => {
          this.token = response.auth_token;
          if (!this.token) {
            throw new HttpErrorResponse({
              status: 400,
              statusText: "Не получен токен!",
            });
          }

          localStorage.setItem("authToken", this.token);
        })
      );
  }

  isAuthenticated(): boolean {
    if (!this.token) {
      this.token = localStorage.getItem("authToken");
    }

    return !!this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem("authToken");
  }
}
