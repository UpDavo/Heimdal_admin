import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-table-dropdown-inapp",
  templateUrl: "./table-dropdown-inapp.component.html",
})
export class TableDropdownInappComponent implements AfterViewInit {
  @Input() text_to_copy: any;
  @Input() inapp_id: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    private dataService: DataService
  ) {}

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {}

  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  copyMessage(val: string) {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  deleteInapp() {
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
        this.apiService.deletePoc(this.inapp_id).subscribe(() => {
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
