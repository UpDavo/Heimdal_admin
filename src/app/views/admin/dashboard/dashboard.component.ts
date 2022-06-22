import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  montly_sessions = 0;
  today_sessions = 0;
  montly_orders = 0;
  montly_links = 0;
  constructor(private service: ApiService) {}

  ngOnInit() {
    const tempDate = new Date();
    const tempYear = tempDate.getFullYear();
    const tempMonth = tempDate.getMonth() + 1;
    this.service
      .getClients(tempMonth.toString(), tempYear.toString())
      .subscribe((response: Array<any>) => {
        response.forEach((client) => {});
      });
  }
}
