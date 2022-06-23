import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  sales_data;
  is_loaded = false;
  constructor(private service: ApiService) {}

  async ngOnInit() {
    this.sales_data = await this.getData();
    this.is_loaded = true;
  }

  async getData() {
    const tempDate = new Date();
    const tempYear = tempDate.getFullYear();
    const tempMonth = tempDate.getMonth() + 1;
    const data = await firstValueFrom(
      this.service.getClients(tempMonth.toString(), tempYear.toString())
    );
    return data;
  }
}
