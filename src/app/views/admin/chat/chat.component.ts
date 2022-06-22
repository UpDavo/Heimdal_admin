import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
})
export class ChatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  changeIframe() {
    window.frames["chatFrame"].location =
      "https://bots.chat-api.com/#/165/chats/";
  }
}
