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

  setPoc(object: any) {
    return this.httpClient.post(this.url, object);
  }
}
