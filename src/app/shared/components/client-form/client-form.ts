import { CommonModule } from "@angular/common";
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { firstValueFrom } from "rxjs";
import { ClientService } from "../../clients";

@Component({
  standalone: true,
  selector: "client-form",
  templateUrl: "./client-form.html",
  styleUrls: ["./client-form.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
  ],
})
export class ClientFormComponent {
  destroyRef = inject(DestroyRef);
  @Output() clientCreated = new EventEmitter<void>();
  form: FormGroup;
  isCreating = false;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.form = this.fb.group({
      fio: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      template: ["Тестовый", Validators.required],
    });
  }

  async createClient() {
    if (!this.validateForm()) return;

    this.isCreating = true;

    const create$ = this.clientService.createClient(this.form.value);
    await firstValueFrom(create$).finally(() => {
      this.isCreating = false;
    });

    this.clientCreated.emit();

    this.resetForm();
  }

  private resetForm() {
    for (let [key, control] of Object.entries(this.form.controls)) {
      if (key === "template") continue;

      control.reset();
      control.setErrors(null);
    }
  }

  private validateForm() {
    let isValid = true;

    for (let control of Object.values(this.form.controls)) {
      control.updateValueAndValidity();
      control.markAsTouched();

      if (control.invalid) {
        isValid = false;
      }
    }

    return isValid;
  }
}
