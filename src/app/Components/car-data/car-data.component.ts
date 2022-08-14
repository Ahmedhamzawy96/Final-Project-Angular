import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/Interface/ICar';
import { IExportProduct } from 'src/app/Interface/IExportProduct';
import { CarService } from 'src/app/Services/Car/car.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css'],
})
export class CarDataComponent implements OnInit {
  car: IExportProduct[];
  carsdata: ICar[];
  cardataform: FormGroup;
  carID: number;

  constructor(private carserv: CarService) {
    this.cardataform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      notes: new FormControl(''),
    });

    console.log(this.cardata);

    this.ngOnInit();
  }

  ngOnInit(): void {
    //2
    this.carserv.getCar().subscribe((Date) => {
      this.carsdata = Date;
      console.log(this.carsdata);
      console.log(Date);
    });
  }

  cardata() {
    if (this.cardataform.valid) {
      this.carserv.addCar(this.cardataform.value).subscribe(() => {
        this.carserv.getCar().subscribe((Date) => {
          this.carsdata = Date;
          console.log(this.carsdata);
          console.log(Date);
        });
      });
    }
  }
  deleteCar(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'حذف  العربة ',
        text: 'هل انت متاكد من حذفه هذة العربة ',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'لا',

        confirmButtonText: 'نعم',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.carserv.deleteCar(id).subscribe(() => {
            this.carsdata = this.carsdata.filter((item) => item.id !== id);
            console.log(' deleted successfully!');
          });
          this.carsdata.pop();
          swalWithBootstrapButtons.fire(
            'تم الحذف',
            'تم حذف العربة ',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('الغاء', 'لم يتم حذف العربة ', 'error');
        }
      });
  }

  updatecar(id: Number, name: string, notes: string) {
    let upcar = this.carsdata.find((upcarr) => upcarr.id == id);
    upcar.name = name;
    upcar.notes = notes;
    this.carserv.updateCar(<number>upcar.id, upcar).subscribe();
  }
}
