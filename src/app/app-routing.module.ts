import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { ChatComponent } from "./views/admin/chat/chat.component";
import { InappComponent } from "./views/admin/inapp/inapp.component";
import { AuthGuard } from "./services/auth.guard";
import { AuthGuard2 } from "./services/auth2.guard";
import { CountdownViewComponent } from "./views/admin/inapp/inapps/countdown/countdown.component";
import { FogViewComponent } from "./views/admin/inapp/inapps/fog/fog.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: "pocs", component: TablesComponent, canActivate: [AuthGuard] },
      { path: "chat", component: ChatComponent, canActivate: [AuthGuard] },
      { path: "inapp", component: InappComponent, canActivate: [AuthGuard] },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: "countdown", component: CountdownViewComponent },
  { path: "fog", component: FogViewComponent },
  // auth views
  { path: "login", component: LoginComponent, canActivate: [AuthGuard2] },
  // no layout views
  { path: "**", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
