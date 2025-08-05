import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { IClient, IGetClientsRequest } from "@tecya/interfaces";
import { AuthService } from "../shared/auth/auth.service";
import { ClientService } from "../shared/clients";
import { ClientFormComponent, PushDialogComponent } from "../shared/components";
import { PhoneInputComponent } from "../shared/components/phone-number-input/phone-number";
import { PhoneNumberPipe } from "../shared/pipes/phone-number.pipe";

@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ClientFormComponent,
    PhoneInputComponent,
    PhoneInputComponent,
    PhoneNumberPipe
  ],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    "user_id",
    "fio",
    "email",
    "template",
    "phone",
    "actions",
  ];
  dataSource = new MatTableDataSource<IClient>();

  pageSize = 10;
  pageIndex = 0;
  searchQuery: string = "";

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    const search: IGetClientsRequest = {
      limit: this.pageSize,
      offest: this.pageIndex * this.pageSize,
    };

    if (this.searchQuery) {
      search.search = this.searchQuery;
    }

    this.clientService.getClients(search).subscribe({
      next: (clients: any) => {
        this.dataSource.data = clients;
      },
      error: (error: any) => {
        console.error("Не получен список клиентов!", error);
      },
    });
  }

  clearPhone() {
    this.searchQuery = "";
  }

  onPhoneCompleted(value: string) {
    this.searchQuery = value;
    this.loadClients();
  }

  applyFilter() {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === "") {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      const field = sort.active as keyof IClient;

      return compare(a[field], b[field], isAsc);
    });
  }

  openPushDialog(client: IClient) {
    this.dialog.open(PushDialogComponent, {
      data: { clientId: client.user_id },
      width: "400px",
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}

function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
