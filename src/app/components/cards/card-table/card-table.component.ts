import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
// import { MatPaginator } from "@angular/material/paginator";
// import { MatTableDataSource } from "@angular/material/table";

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
  workPercentage: string;
}
@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit, AfterViewInit {
  private _color: string = "light";
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];

  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }

  constructor(private service: ApiService) {}

  pocs: any;

  ngOnInit(): void {
    this.service.getPocs().subscribe((response) => {
      this.pocs = response;
    });
  }

  ngAfterViewInit() {}
}
