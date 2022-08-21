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
  Addeded: boolean = false;
  tableNotValid: boolean = false;

  constructor(private carserv: CarService) {
    this.cardataform = new FormGroup({
<<<<<<< HEAD
<<<<<<< Updated upstream
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
=======
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        // Validators.pattern('[a-zA-z]'),
      ]),
>>>>>>> Stashed changes
=======
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-z]'),
      ]),
>>>>>>> 043f1e67cb6494457e57f3e74df888d22da96aeb
      notes: new FormControl(''),
    });

    this.ngOnInit();
  }
  get name() {
    return this.cardataform.get('name');
  }

  get notes() {
    return this.cardataform.get('notes');
  }

  ngOnInit(): void {
    //2
    this.carserv.getCar().subscribe((Date) => {
      this.carsdata = Date;
    });
  }

  cardata() {
    this.Addeded = true;
    if (this.cardataform.valid) {
      this.carserv.addCar(this.cardataform.value).subscribe(() => {
        this.cardataform.reset();
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'تم الاضافة بنجاح',
        });
        this.Addeded = false;
        this.carserv.getCar().subscribe((Date) => {
          this.carsdata = Date;
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
            this.carserv.getCar().subscribe((Date) => {
              this.carsdata = Date;
            });
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

  updatecar(id: Number, name: string, notes: string, ref: HTMLInputElement) {
    this.tableNotValid = true;
    if (name.length < 3) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'يجب الا يقل الاسم عن 4 حروف',
      });
    } else {
      let upcar = this.carsdata.find((upcarr) => upcarr.id == id);
      upcar.name = name;
      upcar.notes = notes;
      this.carserv.updateCar(<number>upcar.id, upcar).subscribe();
      ref.checked = false;
      this.tableNotValid = false;
    }
  }
}
