import { Component, OnInit, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";

@Component({
  selector: "app-card-modal",
  templateUrl: "./card-modal.component.html",
  styleUrls: ["./bootstrap.min.css"],
})
export class CardModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardModalComponent>,
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
      city: f.value.city,
      groupId: f.value.pocGroupId,
      name: f.value.name,
      pocId: f.value.pocId,
      direction: f.value.direction,
      phone: f.value.phone,
      pocPayphone: f.value.pocPayphone,
      lastEdit: new Date(),
      tchatId: f.value.tchatId,
      working: true,
    };

    this.service.setPoc(send_data).subscribe(() => {
      this.notifyForChange();
      this.dialogRef.close();
    });
  }
}
