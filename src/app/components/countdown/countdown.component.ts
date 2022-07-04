import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";

@Component({
  selector: "app-countdown",
  templateUrl: "./countdown.component.html",
  styleUrls: ["./countdown.component.css"],
})
export class CountdownComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date("Jul 05 2022 00:00:00");
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  ngOnInit() {
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });

    const HOURS = 1000 * 60 * 60;
    const MINUTES = 1000 * 60;
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const todaysDate = new Date();
    const timeToAdd = 20 * 24 * HOURS;
    // 9 days from current date
    const timerEndDate = new Date(todaysDate.getTime() + timeToAdd);
    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const difference = timerEndDate.getTime() - currentTime;
      const remainingDays = Math.floor(difference / (HOURS * 24));
      const remainingHours = Math.floor((difference % (HOURS * 24)) / HOURS);
      const remainingMinutes = Math.floor((difference % HOURS) / MINUTES);
      const remainingSeconds = Math.floor((difference % MINUTES) / 1000);
      const formattedDays =
        remainingDays < 10 ? `0${remainingDays}` : `${remainingDays}`;
      const formattedHours =
        remainingHours < 10 ? `0${remainingHours}` : `${remainingHours}`;
      const formattedMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
      const formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
      daysElement.innerText = formattedDays;
      hoursElement.innerText = formattedHours;
      minutesElement.innerText = formattedMinutes;
      secondsElement.innerText = formattedSeconds;
    };
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
