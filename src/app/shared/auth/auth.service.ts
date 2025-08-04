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
  private _token: string | null = null;

  get token() {
    return this._token;
  }

  login(credentials: IAuthCredentials): Observable<any> {
    return this.http
      .post<IAuthResponse>(this.environment.testApiUrl, credentials)
      .pipe(
        tap((response) => {
          this._token = response.auth_token;
          if (!this._token) {
            throw new HttpErrorResponse({
              status: 400,
              statusText: "Не получен токен!",
            });
          }

          localStorage.setItem("authToken", this._token);
        })
      );
  }

  isAuthenticated(): boolean {
    if (!this._token) {
      this._token = localStorage.getItem("authToken");
    }

    return !!this._token;
  }

  logout(): void {
    this._token = null;
    localStorage.removeItem("authToken");
  }
}
