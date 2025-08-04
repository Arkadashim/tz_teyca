import { Routes } from "@angular/router";
import { authGuard } from "./shared/auth/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./login").then((m) => m.LoginComponent),
  },
  {
    path: "404",
    loadComponent: () => import("./not-found").then((m) => m.NotFoundComponent),
  },
  {
    path: "home",
    loadComponent: () => import("./home").then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/404" },
];
