import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "web-not-found",
  templateUrl: "./not-found.html",
  styleUrls: ["./not-found.scss"],
  imports: [MatButtonModule, RouterModule, MatButtonModule],
})
export class NotFoundComponent {}
