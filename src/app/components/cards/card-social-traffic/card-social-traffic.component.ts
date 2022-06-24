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
  percentages = [];
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
    return array.map((a) => {
      return (a * 100) / sum;
    });
  }
}
