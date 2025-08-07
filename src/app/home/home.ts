import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { IClient, IGetClientsRequest } from "@tecya/interfaces";
import { AuthService } from "../shared/auth/auth.service";
import { ClientService } from "../shared/clients";
import { ClientFormComponent, PushDialogComponent } from "../shared/components";
import { PhoneInputComponent } from "../shared/components/phone-number-input/phone-number";
import { compare } from "../shared/helpers";
import { PhoneNumberPipe } from "../shared/pipes/phone-number.pipe";
import { firstValueFrom } from "rxjs";

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
    PhoneNumberPipe,
  ],
})
export class HomeComponent implements OnInit {
  readonly paginationSizeOptions = [10, 15, 20];
  readonly displayedColumns: string[] = [
    "user_id",
    "fio",
    "email",
    "template",
    "phone",
    "actions",
  ];
  dataSource = new MatTableDataSource<IClient>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = this.paginationSizeOptions[0];
  pageIndex = 0;
  searchQuery: string = "";

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    await this.loadClients();
  }

  async loadClients() {
    const search: IGetClientsRequest = {
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize,
    };

    if (this.searchQuery) {
      search.search = `phone=${this.searchQuery}`;
    }

    const clients$ = this.clientService.getClients(search);
    const clients = await firstValueFrom(clients$);

    this.dataSource.data = clients;
    this.applyPaginatorChanges();
  }

  clearPhone() {
    if (this.searchQuery === "") return;

    this.searchQuery = "";
    this.loadClients();
  }

  onPhoneCompleted(value: string) {
    this.searchQuery = value;
    this.loadClients();
  }

  onPageChange(event: PageEvent) {
    // При изменении количества записей на страницу, вернемся на начальную страницу
    this.pageIndex = this.pageSize !== event.pageSize ? 0 : event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadClients();
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
      data: { user_id: client.user_id },
      width: "400px",
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  // API не возвращает информацию о максимальном количестве элементов, поэтому пусть наращивается динамически
  private applyPaginatorChanges() {
    const tableLength = this.dataSource.data.length;
    const tableHasMoreData = tableLength === this.pageSize;

    this.paginator.length = tableHasMoreData
      ? (this.pageIndex + 1) * this.pageSize + 1
      : this.pageIndex * this.pageSize + tableLength;
  }
}
