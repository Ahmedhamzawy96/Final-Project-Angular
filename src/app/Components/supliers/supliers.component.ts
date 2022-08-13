import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
import Swall from 'sweetalert2';

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
  constructor(
    private _supplierservice: SupplierService,
    private fBuilder: FormBuilder
  ) {
    this.userSupplier = fBuilder.group({
      name: [''],
      phone: [''],
      notes: [''],
    });
  }

  addsupplier() {
    this._supplierservice
      .addSupplier(this.userSupplier.value)
      .subscribe((result: ISupplier) => {
        this.sply.push(result);

        this._supplierservice.getSupplier().subscribe((data: ISupplier[]) => {
          this.sply = data;
        });
      });
  }
  getSupp() {
    this._supplierservice.getSupplier().subscribe((data: ISupplier[]) => {
      this.sply = data;
    });
  }

  deletesupplier(id: number) {
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
  updatesupplier(id: Number, name: string, phone: string, notes: string) {
    let sup = this.sply.find((upcustomerr) => upcustomerr.id == id);
    sup.name = name;
    sup.phone = phone;
    sup.notes = notes;
    this.updatesupplier;
    this._supplierservice.updateSupplier(<number>sup.id, sup).subscribe();
  }

  ngOnInit(): void {
    this._supplierservice.getSupplier().subscribe((Data) => {
      this.sply = Data;
    });
  }
}
