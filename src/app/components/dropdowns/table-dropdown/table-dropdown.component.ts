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
  constructor(public dialog: MatDialog) {}

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

  deletePoc() {}
}
