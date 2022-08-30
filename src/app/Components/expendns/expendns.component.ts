import { Component, OnInit } from '@angular/core';
import { IExpenses } from 'src/app/Interface/IExpenses';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ExpendsService } from 'src/app/Services/Expends/expends.service';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-expendns',
  templateUrl: './expendns.component.html',
  styleUrls: ['./expendns.component.css'],
})
export class ExpendnsComponent implements OnInit {
  id: number;
  name: string;
  Expand: IExpenses[] = [];
  userexpendne: FormGroup;
  Addeded: boolean = false;
  tableNotValid: boolean = false;
  constructor(private exserv: ExpendsService) {}

  ngOnInit(): void {
    this.exserv.getExpends().subscribe((Data) => {
      this.Expand = Data;
    });
  }

  addexpend() {
    this.Addeded = true;
    if (this.name.length > 2) {
      this.exserv.addExpends({ name: this.name }).subscribe((data) => {
        this.name = ' ';
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'تم الاضافة بنجاح',
        });
        this.Addeded = false;
        this.Expand.push(data);
      });
    }
  }

  changeTable(id: Number, name: string, ref: HTMLInputElement) {
    this.tableNotValid = true;
    if (name.length < 3) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب الا يقل الاسم عن 4 حروف',
      });
    } else {
      let ex = this.Expand.find((ex) => ex.id == id);
      ex.name = name;
      this.exserv.updateExpends(<number>id, ex).subscribe();
      ref.checked = false;
      this.tableNotValid = false;
    }
  }
  deletexpend() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'حذف  البند',
        text: 'هل انت متاكد من حذفه هذا البند',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'لا',

        confirmButtonText: 'نعم',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.exserv.deleteExpends(this.id).subscribe((Date) => {
            this.exserv.getExpends().subscribe((Data) => {
              this.Expand = Data;
            });
          });
          swalWithBootstrapButtons.fire('تم الحذف', 'تم حذف البند', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف البند', 'error');
        }
      });
  }
}
