import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./login").then((m) => m.LoginComponent),
  },
  {
    path: "404",
    loadComponent: () => import("./not-found").then((m) => m.NotFoundComponent),
  },
  { path: "**", redirectTo: "/404" },
];
