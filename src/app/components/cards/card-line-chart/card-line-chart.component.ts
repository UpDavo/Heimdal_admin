import { Component, OnInit, Input } from "@angular/core";
import Chart from "chart.js";

@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
})
export class CardLineChartComponent implements OnInit {
  @Input() sales;

  constructor() {}

  ngOnInit() {
    console.log(this.sales);
  }
  ngAfterViewInit() {
    console.log(this.sales);
    const now = new Date();
    const current_days = this.getAllDaysInMonth(
      now.getFullYear(),
      now.getMonth()
    );
    let card_array: any[] = [];
    let cash_array: any[] = [];

    current_days.forEach((day) => {
      let data = this.sales.find((o) => o.day == day.toString());
      if (data !== undefined) {
        card_array.push(data.today_orders_card);
        cash_array.push(data.today_orders_cash);
      } else {
        card_array.push(0);
        cash_array.push(0);
      }
    });

    var config = {
      type: "line",
      data: {
        labels: current_days,
        datasets: [
          {
            label: "Credit Card",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: card_array,
            fill: false,
          },
          {
            label: "Cash",
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: cash_array,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }

  getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
      dates.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }
}
