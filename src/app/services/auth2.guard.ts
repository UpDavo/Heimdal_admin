import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthGuard2 implements CanActivate {
  constructor(public authService: FirebaseService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn === true) {
      this.router.navigate(["admin"]);
    }
    return true;
  }
}
