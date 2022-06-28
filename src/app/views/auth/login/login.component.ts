import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: "",
  };

  checked = true;
  constructor(private authService: FirebaseService, public router: Router) {}

  ngOnInit(): void {
    if (
      localStorage.getItem("email") !== null &&
      localStorage.getItem("password") !== null
    ) {
      this.user.email = localStorage.getItem("email");
      this.user.password = localStorage.getItem("password");
    }
  }

  login() {
    if (this.checked) {
      localStorage.setItem("email", this.user.email);
      localStorage.setItem("password", this.user.password);
    } else {
      localStorage.setItem("email", null);
      localStorage.setItem("password", null);
    }

    this.authService
      .login(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(["admin"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loginWithGoogle() {
    if (this.checked) {
      localStorage.setItem("email", this.user.email);
      localStorage.setItem("password", this.user.password);
    } else {
      localStorage.setItem("email", null);
      localStorage.setItem("password", null);
    }
    this.authService.loginWithGoogle();
    this.router.navigate(["admin"]);
  }

  register() {
    console.log(this.user);
    this.authService
      .register(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
      });
  }
}
