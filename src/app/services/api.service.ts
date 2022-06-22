import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private url = "https://heimdalec-ws2.herokuapp.com/api/pocs?quantity=all";

  constructor(private httpClient: HttpClient) {}

  getPocs() {
    return this.httpClient.get(this.url);
  }

  setPoc() {
    return this.httpClient.post(this.url, {
      city: "request.city",
      groupId: "request.groupId",
      name: "request.name",
      pocId: "request.pocId",
      direction: "request.direction",
      phone: "request.phone",
      pocPayphone: "request.pocPayphone",
      lastEdit: "new Date()",
      tchatId: "request.tchatId",
    });
  }
}
