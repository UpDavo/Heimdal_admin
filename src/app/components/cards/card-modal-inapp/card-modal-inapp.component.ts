import { Component, OnInit, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";

@Component({
  selector: "app-card-modal",
  templateUrl: "./card-modal-inapp.component.html",
  styleUrls: ["./bootstrap.min.css"],
})
export class CardModalInappComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardModalInappComponent>,
    private service: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  notifyForChange() {
    this.dataService.notifyAboutChange();
  }

  onSubmit(f: NgForm) {
    const send_data = {
      name: f.value.inappName,
      url: f.value.inappUrl,
    };

    this.service.setPoc(send_data).subscribe(() => {
      this.notifyForChange();
      this.dialogRef.close();
    });
  }
}
