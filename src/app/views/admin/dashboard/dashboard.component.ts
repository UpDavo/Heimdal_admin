import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  sales_data = [];
  constructor(private service: ApiService) {}

  ngOnInit() {
    const tempDate = new Date();
    const tempYear = tempDate.getFullYear();
    const tempMonth = tempDate.getMonth() + 1;
    this.service
      .getClients(tempMonth.toString(), tempYear.toString())
      .subscribe((response) => {
        this.assignVariable(response);
      });
  }

  assignVariable(data) {
    this.sales_data = data;
    console.log(this.sales_data);
  }
}
