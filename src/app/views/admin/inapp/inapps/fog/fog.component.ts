import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-fog",
  templateUrl: "./fog.component.html",
  styleUrls: ["./fog.component.css", "./magic.min.css"],
})
export class FogViewComponent implements OnInit {
  ngOnInit() {
    this.vanishIn();
  }

  vanishIn() {
    const selector = document.querySelector(".container");
    selector.classList.add("magictime", "vanishIn");
  }
}
