import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  //private url = "http://localhost:3000";
  private url = "https://heimdalec-ws.herokuapp.com";
  private heroku = "https://api.heroku.com/apps";
  private app = "b76121b9-bc46-4783-9dfd-e149dbb073b9";

  constructor(private httpClient: HttpClient) {}

  getPocs() {
    return this.httpClient.get(this.url + "/api/pocs?quantity=all");
  }

  getBots(month: string, year: string) {
    return this.httpClient.get(
      this.url + "/api/bot?month=" + month + "&year=" + year
    );
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

  restartDyno(dyno: any) {
    return this.httpClient.delete(
      this.heroku + "/" + this.app + "/dynos/" + dyno,
      {
        headers: {
          Accept: "application/vnd.heroku+json; version=3",
          Authorization: "Bearer ddf289d2-b659-4d00-a03f-afb1fbd1f49b",
          "Content-Type": "application/json",
        },
      }
    );
  }

  getDyno() {
    return this.httpClient.get(this.heroku + "/" + this.app + "/dynos/", {
      headers: {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer ddf289d2-b659-4d00-a03f-afb1fbd1f49b",
        "Content-Type": "application/json",
      },
    });
  }
}

//token ddf289d2-b659-4d00-a03f-afb1fbd1f49b
//id 23cf14f4-3c54-4331-b3db-0deede2f7303
//dyno 92e8c7f8-94b5-4693-869d-9f5ecc150c71
