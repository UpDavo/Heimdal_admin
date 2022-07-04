import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-bot-traffic",
  templateUrl: "./card-bot-traffic.component.html",
})
export class CardBotTrafficComponent implements OnInit {
  @Input() bot;
  bot_responses = {
    "No comprendo": 0,
    "Como realizar un pedido": 0,
    "Como reclamar un cupón de premio": 0,
    "Horarios de atención": 0,
    "Como funcionan la cuponera": 0,
    Promociones: 0,
    "Hablar con un asesor": 0,
  };

  sesiones = 0;
  percentages;
  constructor() {}

  ngOnInit(): void {
    this.bot.forEach((client) => {
      this.bot_responses["Como realizar un pedido"] +=
        client["Como realizar un pedido"];
      this.bot_responses["Como reclamar un cupón de premio"] +=
        client["Como reclamar un cupón de premio"];
      this.bot_responses["Hablar con un asesor"] +=
        client["Hablar con un asesor"];
      this.bot_responses["Horarios de atención"] +=
        client["Horarios de atención"];
      this.bot_responses["No comprendo"] += client["No comprendo"];
      this.bot_responses["Como funcionan la cuponera"] +=
        client["Como funcionan la cuponera"];
      this.bot_responses["Promociones"] += client["Promociones"];

      this.sesiones += client["sesiones"];
    });

    console.log(this.bot);
    this.percentages = this.getPercentages();
  }

  getPercentages() {
    let array = [];
    for (const property in this.bot_responses) {
      array.push(this.bot_responses[property]);
    }
    const sum = array.reduce((partialSum, a) => partialSum + a, 0);

    const percentages = array.map((a) => {
      return ((a * 100) / sum).toFixed(2);
    });

    return {
      "No comprendo": percentages[0],
      "Como realizar un pedido": percentages[1],
      "Como reclamar un cupón de premio": percentages[2],
      "Horarios de atención": percentages[3],
      "Como funcionan la cuponera": percentages[4],
      Promociones: percentages[5],
      "Hablar con un asesor": percentages[6],
    };
  }
}
