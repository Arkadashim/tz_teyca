import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import {
  IClient,
  IGetClientsRequest,
  IGetClientsResponse,
} from "@tecya/interfaces";
import { map, Observable } from "rxjs";
import { ENVIRONMENT } from "../../app.config";
import { AuthService } from "../auth/auth.service";
import { buildQuery } from "../helpers";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private environment = inject(ENVIRONMENT);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getClients(params: IGetClientsRequest): Observable<IClient[]> {
    return this.http
      .get<IGetClientsResponse>(
        `${this.environment.apiUrl}/v1/${
          this.authService.token
        }/passes?${buildQuery(params)}`
      )
      .pipe(map((response) => response.passes));
  }

  createClient(client: Partial<IClient>): Observable<IClient> {
    return this.http.post<IClient>(
      `${this.environment.apiUrl}/v1/${this.authService.token}/passes`,
      client
    );
  }

  sendPush(clientId: number, message: string): Observable<any> {
    return this.http.post(`${this.environment.apiUrl}/push`, {
      clientId,
      message,
    });
  }
}
