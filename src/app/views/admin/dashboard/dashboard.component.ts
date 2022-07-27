import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  sales_data;
  data_bot;
  is_loaded = false;
  month = "Enero";
  edited = false;
  constructor(private service: ApiService) {}

  async ngOnInit() {
    if (this.edited == false) {
      this.sales_data = await this.getData(this.getMonthNumber());
      this.data_bot = await this.getDataBot();
      this.is_loaded = true;
    } else {
      this.sales_data = await this.getData(this.getMonthNumber());
      this.data_bot = await this.getDataBot();
      this.is_loaded = true;
    }
  }

  async getData(monthNumber) {
    if (this.edited == false) {
      const tempDate = new Date();
      const tempYear = tempDate.getFullYear();
      const tempMonth = tempDate.getMonth() + 1;
      const data = await firstValueFrom(
        this.service.getClients(tempMonth.toString(), tempYear.toString())
      );
      console.log(tempMonth.toString(), tempYear.toString());
      return data;
    } else {
      const tempDate = new Date();
      const tempYear = tempDate.getFullYear();
      const tempMonth = monthNumber;
      const data = await firstValueFrom(
        this.service.getClients(tempMonth.toString(), tempYear.toString())
      );
      console.log(tempMonth.toString(), tempYear.toString());
      return data;
    }
  }

  async getDataBot() {
    const tempDate = new Date();
    const tempYear = tempDate.getFullYear();
    const tempMonth = tempDate.getMonth() + 1;
    const data = await firstValueFrom(
      this.service.getBots(tempMonth.toString(), tempYear.toString())
    );
    return data;
  }

  getMonthNumber() {
    let meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    meses.forEach((element, index) => {
      if (element === this.month) {
        console.log(index);
        return index + 1;
      }
    });
  }

  reRunInit() {
    this.edited = true;
    this.ngOnInit();
  }

  update() {}
}
