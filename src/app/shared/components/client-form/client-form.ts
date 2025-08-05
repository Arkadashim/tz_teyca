import { CommonModule } from "@angular/common";
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ClientService } from "../../clients";
import { firstValueFrom } from "rxjs";

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
    CommonModule,
  ],
})
export class ClientFormComponent {
  destroyRef = inject(DestroyRef);
  @Output() clientCreated = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      template: ["", Validators.required],
    });
  }

  async createClient() {
    if (!this.form.valid) return;

    const create$ = this.clientService.createClient(this.form.value);
    await firstValueFrom(create$);

    this.clientCreated.emit();
    this.form.reset();
  }
}
