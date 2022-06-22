import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CardModalComponent } from "../../cards/card-modal/card-modal.component";
import { MatDialog } from "@angular/material/dialog";

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
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  private _color: string = "light";
  pocs: any;
  dataSource: any;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }

  constructor(private service: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.getPocs().subscribe((response) => {
      this.pocs = response;
      this.displayedColumns = [
        "Poc ID",
        "Name",
        "Phone",
        "Direction",
        "Options",
      ];
      this.dataSource = new MatTableDataSource<any>(this.pocs);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  createPoc() {
    this.dialog.open(CardModalComponent, {
      disableClose: false,
      data: {
        update: false,
      },
    });
  }
}
