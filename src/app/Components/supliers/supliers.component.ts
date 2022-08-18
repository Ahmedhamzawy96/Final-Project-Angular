import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
import Swall from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css'],
})
export class SupliersComponent implements OnInit {
  // GetSupplier:ISupplier[];
  sply: ISupplier[] = [];
  suppid: number;
  userSupplier: FormGroup;
  addsupp: ISupplier[] = [];
  added: boolean = false;
  radiochange:number=-1;
  constructor(
    private _supplierservice: SupplierService,
    private fBuilder: FormBuilder
  ) {
    this.userSupplier = fBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.pattern('[0-9]{11,}'),
        ],
      ],
      notes: [''],
    });
  }

  addsupplier() {
    this.added = true;
    if (this.userSupplier.valid) {
      this._supplierservice
        .addSupplier(this.userSupplier.value)
        .subscribe((result: ISupplier) => {
          this.userSupplier.reset();
          this.added = false;
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'تم الاضافة بنجاح',
          });
          this.sply.push(result);

          this._supplierservice.getSupplier().subscribe((data: ISupplier[]) => {
            this.sply = data;
          });
        });
    }
  }
  getSupp() {
    this._supplierservice.getSupplier().subscribe((data: ISupplier[]) => {
      this.sply = data;
    });
  }

  deletesupplier(id: number) {
    if(this.radiochange!=-1)
    {

      const swalWithBootstrapButtons = Swall.mixin({
        customClass: {
          confirmButton: 'btn btn-success m-2',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: 'حذف  المورد ',
          text: 'هل انت متاكد من حذفه هذا المورد ',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'لا',
  
          confirmButtonText: 'نعم',
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log(this.suppid);
            this._supplierservice.deleteSupplier(id).subscribe((res) => {
              this.sply = this.sply.filter((item) => item.id !== id);
              console.log(' deleted successfully!');
            });
            this.sply.pop();
            swalWithBootstrapButtons.fire(
              'تم الحذف',
              'تم حذف المورد ',
              'success'
            );
          } else if (result.dismiss === Swall.DismissReason.cancel) {
            swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف المورد ', 'error');
          }
        });
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'برجاء اختيار مورد',
      });
    }

  }
  updatesupplier(
    id: Number,
    name: string,
    phone: string,
    notes: string,
    ref: HTMLInputElement
  ) {
    let sup = this.sply.find((upcustomerr) => upcustomerr.id == id);
    sup.name = name;
    sup.phone = phone;
    sup.notes = notes;
    this.updatesupplier;
    this._supplierservice.updateSupplier(<number>sup.id, sup).subscribe();
    ref.checked = false;
    this.radiochange=-1
  }

  ngOnInit(): void {
    this._supplierservice.getSupplier().subscribe((Data) => {
      this.sply = Data;
    });
  }
  ChangeRadio()
  {
    this.radiochange=this.suppid;
  }
}
