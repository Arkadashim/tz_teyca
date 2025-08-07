import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { IEnvironment } from "@tecya/interfaces";
import { environment } from "../env/environment";
import { routes } from "./app.routes";
import { HttpErrorInterceptor } from "./shared/error";
import { AuthInterceptor } from "./shared/auth/auth.interceptor";

export const ENVIRONMENT = new InjectionToken<IEnvironment>("ENVIRONMENT");

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync("animations"),
    provideHttpClient(
      withInterceptors([HttpErrorInterceptor, AuthInterceptor])
    ),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
};
