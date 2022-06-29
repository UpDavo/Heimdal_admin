import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CardModalInappComponent } from "../../cards/card-modal copy/card-modal-inapp.component";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { DataService } from "../../../services/data.service";

export interface Pocs {
  city: string;
  direction: string;
  groupId: string;
  lastEdit: string;
  name: string;
  phone: string;
  pocId: string;
  pocPayphone: string;
  tchatId: string;
  working: boolean;
  // workPercentage: string;
}
@Component({
  selector: "app-card-table-inapp",
  templateUrl: "./card-table-inapp.component.html",
  styleUrls: ["./card-table-inapp.component.css"],
})
export class CardTableInappComponent implements OnInit, OnDestroy {
  constructor(
    private service: ApiService,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}

  private _color: string = "light";
  pocs: any;
  dataSource: any;
  displayedColumns: string[];
  isMobile: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  notifierSubscription: Subscription =
    this.dataService.subjectNotifier.subscribe((notified) => {
      this.service.getPocs().subscribe((response) => {
        this.pocs = response;
        this.displayedColumns = [
          "Name",
          "Actions",
          "Opens",
          "Active",
          "Options",
        ];
        this.dataSource = new MatTableDataSource<any>(this.pocs);
        this.dataSource.paginator = this.paginator;
      });
    });

  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }

  ngOnInit(): void {
    this.service.getPocs().subscribe((response) => {
      this.pocs = response;
      this.displayedColumns = ["Name", "Actions", "Opens", "Active", "Options"];
      this.dataSource = new MatTableDataSource<any>(this.pocs);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  createInapp() {
    this.dialog.open(CardModalInappComponent, {
      disableClose: false,
      data: {
        update: false,
      },
    });
  }
}
