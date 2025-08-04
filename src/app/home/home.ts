import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth/auth.service";

@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
  imports: [CommonModule, MatButtonModule],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
