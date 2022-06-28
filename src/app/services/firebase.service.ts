import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  userData: any;
  constructor(
    private authService: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user")!);
      } else {
        localStorage.setItem("user", "null");
        JSON.parse(localStorage.getItem("user")!);
      }
    });
  }

  async register(email: string, password: string) {
    try {
      return await this.authService.createUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  login(email: string, password: string) {
    return this.authService
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  loginWithGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider()).then(
      (res: any) => {
        if (res) {
          this.router.navigate(["admin"]);
        }
      }
    );
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.authService
      .signInWithPopup(provider)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(["admin"]);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user !== null ? true : false;
  }

  getUserLogged() {
    return this.authService.authState;
  }

  logout() {
    return this.authService.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["login"]);
    });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.authService
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
