import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { IClient } from "@tecya/interfaces";
import { ClientService } from "../../clients";

@Component({
  standalone: true,
  selector: "app-push-dialog",
  templateUrl: "./push-dialog.html",
  styleUrls: ["./push-dialog.scss"],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class PushDialogComponent {
  message: string = "";

  constructor(
    private clientService: ClientService,
    public dialogRef: MatDialogRef<PushDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pick<IClient, "user_id">
  ) {}

  sendPush() {
    if (!this.message.trim()) return;

    this.clientService.sendPush(this.data.user_id, this.message).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => {
        console.error("Ошибка отправки!", error);
        this.dialogRef.close(false);
      },
    });
  }
}
