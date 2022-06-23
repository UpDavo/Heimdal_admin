import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: "app-card-page-visits",
  templateUrl: "./card-page-visits.component.html",
})
export class CardPageVisitsComponent implements OnInit {
  @Input() sales: Array<any>;
  montly_sessions;
  today_sessions;
  today_telegram;
  montly_orders;
  montly_links;
  montly_telegram;
  telegram_value;
  whatsapp_value;
  shown = true;
  constructor(private service: ApiService) {}

  ngOnInit(): void {
    const tempDate = new Date();
    const tempDay = tempDate.getDate();
    this.montly_sessions = 0;
    this.montly_orders = 0;
    this.montly_links = 0;
    this.montly_telegram = 0;

    this.sales.forEach((client) => {
      this.montly_sessions += client.today_sessions;
      this.montly_orders += client.today_orders_card + client.today_orders_cash;
      this.montly_links += client.today_payment_links;
      this.montly_telegram += client.today_telegram_messages;
      if (client.day == tempDay.toString()) {
        this.today_sessions = client.today_sessions;
        this.today_telegram = client.today_telegram_messages;
        this.telegram_value = client.cost_per_telegram_message;
        this.whatsapp_value = client.cost_per_session;
      }
    });
  }
}
