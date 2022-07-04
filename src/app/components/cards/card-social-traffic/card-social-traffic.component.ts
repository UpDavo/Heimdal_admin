import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-social-traffic",
  templateUrl: "./card-social-traffic.component.html",
})
export class CardSocialTrafficComponent implements OnInit {
  @Input() sales;
  errors = {
    "Banco no aceptó la transacción": 0,
    "Cliente no respondió": 0,
    "Datos de tarjeta incorrectos": 0,
    "Fondos Insuficientes": 0,
    "No fue posible validar el pago, por favor vuelva a intentarlo con otros datos.": 0,
    "Tarjeta temporalmente inactivada": 0,
    "Transacción negada": 0,
    other: 0,
  };
  percentages;
  total_errors = 0;
  constructor() {}

  ngOnInit(): void {
    this.sales.forEach((client) => {
      this.errors["Banco no aceptó la transacción"] +=
        client.errors["Banco no aceptó la transacción"];
      this.errors["Cliente no respondió"] +=
        client.errors["Cliente no respondió"];
      this.errors["Datos de tarjeta incorrectos"] +=
        client.errors["Datos de tarjeta incorrectos"];
      this.errors["Fondos Insuficientes"] +=
        client.errors["Fondos Insuficientes"];
      this.errors[
        "No fue posible validar el pago, por favor vuelva a intentarlo con otros datos."
      ] +=
        client.errors[
          "No fue posible validar el pago, por favor vuelva a intentarlo con otros datos."
        ];
      this.errors["Tarjeta temporalmente inactivada"] +=
        client.errors["Tarjeta temporalmente inactivada"];
      this.errors["Transacción negada"] += client.errors["Transacción negada"];
      this.errors["other"] += client.errors["other"];
    });
    this.percentages = this.getPercentages();
  }

  getPercentages() {
    let array = [];
    for (const property in this.errors) {
      array.push(this.errors[property]);
    }
    const sum = array.reduce((partialSum, a) => partialSum + a, 0);
    this.total_errors = sum;

    const percentages = array.map((a) => {
      return ((a * 100) / sum).toFixed(2);
    });

    return {
      "Banco no aceptó la transacción": percentages[0],
      "Cliente no respondió": percentages[1],
      "Datos de tarjeta incorrectos": percentages[2],
      "Fondos Insuficientes": percentages[3],
      "No fue posible validar el pago, por favor vuelva a intentarlo con otros datos.":
        percentages[4],
      "Tarjeta temporalmente inactivada": percentages[5],
      "Transacción negada": percentages[6],
      other: percentages[7],
    };
  }
}
