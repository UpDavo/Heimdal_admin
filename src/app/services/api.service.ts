import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  //private url = "https://heimdalec-ws2.herokuapp.com/api/pocs?quantity=all";
  private url = "https://heimdalec-ws.herokuapp.com";

  constructor(private httpClient: HttpClient) {}

  getPocs() {
    return this.httpClient.get(this.url + "/api/pocs?quantity=all");
  }

  setPoc(object: any) {
    return this.httpClient.post(this.url + "/api/pocs", object);
  }

  deletePoc(id: any) {
    return this.httpClient.delete(this.url + "/api/pocs?id=" + id);
  }

  getClients(month: string, year: string) {
    return this.httpClient.get(
      this.url + "/api/clients?month=" + month + "&year=" + year
    );
  }
}
