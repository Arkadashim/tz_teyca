import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { AuthService } from "../shared/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  standalone: true,
  selector: "login",
  templateUrl: "./login.html",
  styleUrls: ["./login.scss"],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class LoginComponent {
  isLoading = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  public async onSubmit() {
    if (!this.form.valid) return;

    this.isLoading = true;

    const login = this.form.get("login")?.value;
    const password = this.form.get("password")?.value;

    const signin$ = this.authService.login({ login, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.isLoading = false;
        this.snackBar.open(error.statusText);
        return throwError(() => error);
      })
    );

    await firstValueFrom(signin$);
    const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    await this.router.navigateByUrl(returnUrl);

    this.isLoading = false;
  }
}
