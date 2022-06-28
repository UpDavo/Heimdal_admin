import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  montly_sessions;
  today_sessions;
  today_telegram;
  montly_orders;
  montly_links;
  montly_telegram;
  shown = true;
  constructor(private service: ApiService) {}

  ngOnInit(): void {
    const tempDate = new Date();
    const tempYear = tempDate.getFullYear();
    const tempMonth = tempDate.getMonth() + 1;
    const tempDay = tempDate.getDate();
    this.montly_sessions = 0;
    this.today_sessions = 0;
    this.today_telegram = 0;
    this.montly_orders = 0;
    this.montly_links = 0;
    this.montly_telegram = 0;

    this.service
      .getClients(tempMonth.toString(), tempYear.toString())
      .subscribe((response: Array<any>) => {
        response.forEach((client) => {
          this.montly_sessions += client.today_sessions;
          this.montly_orders +=
            client.today_orders_card + client.today_orders_cash;
          this.montly_links += client.today_payment_links;
          this.montly_telegram += client.today_telegram_messages;
          if (client.day == tempDay.toString()) {
            this.today_sessions = client.today_sessions;
            this.today_telegram = client.today_telegram_messages;
          }
        });
      });
  }

  updateComponent() {
    this.ngOnInit();
  }
  hideComponent() {
    if (this.shown) {
      this.shown = false;
    } else {
      this.shown = true;
    }
  }

  restartDyno() {
    Swal.fire({
      title: "Are you sure?",
      text: "After this the server will restart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restart it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.getDyno().subscribe((response) => {
          this.service.restartDyno(response[0].id).subscribe(() => {
            Swal.fire(
              "Restarted!",
              "Your Dyno server has been restarted.",
              "success"
            );
          });
        });
      }
    });
  }
}
