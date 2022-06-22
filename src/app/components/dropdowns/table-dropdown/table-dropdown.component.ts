import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { createPopper } from "@popperjs/core";
import { MatDialog } from "@angular/material/dialog";
import { CardModalComponent } from "../../cards/card-modal/card-modal.component";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-table-dropdown",
  templateUrl: "./table-dropdown.component.html",
})
export class TableDropdownComponent implements AfterViewInit {
  @Input() city: any;
  @Input() direction: any;
  @Input() groupId: any;
  @Input() name: any;
  @Input() phone: any;
  @Input() pocId: any;
  @Input() pocPayphone: any;
  @Input() tchatId: any;
  @Input() working: any;
  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    private dataService: DataService
  ) {}

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  updatePoc() {
    this.dialog.open(CardModalComponent, {
      disableClose: false,
      data: {
        update: true,
        pocId: this.pocId,
        name: this.name,
        phone: this.phone,
        direction: this.direction,
        payphone: this.pocPayphone,
        groupId: this.groupId,
        city: this.city,
        tchatId: this.tchatId,
      },
    });
  }

  deletePoc() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deletePoc(this.pocId).subscribe(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.notifyForChange();
        });
      }
    });
  }

  notifyForChange() {
    this.dataService.notifyAboutChange();
  }
}
