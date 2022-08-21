import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'src/app/Interface/Enums/user-type';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IImportReciept } from 'src/app/Interface/IImportReciept';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ImportReceiptService } from 'src/app/Services/Import Receipt/import-receipt.service';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-main-refund',
  templateUrl: './main-refund.component.html',
  styleUrls: ['./main-refund.component.css'],
})
export class MainRefundComponent implements OnInit {
  RefundType: number;
  recID: number;
  ExporReciept: IExportReciept[] = [];
  SotreReciepts: IExportReciept[] = [];
  importReciets: IImportReciept[] = [];
  selectedRec: number;

  constructor(
    private ExpRecServ: ExportRecieptService,
    private ImportServ: ImportReceiptService,
    private userServ: UsersService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  selectchange() {
    if (this.RefundType == 0) {
      this.ExpRecServ.getReciepts().subscribe((data) => {
        this.ExporReciept = data;
        this.ExporReciept.forEach((element) => {
          if (element.carID == null) {
            this.SotreReciepts.push(element);
          }
        });
      });
    } else if (this.RefundType == 1) {
      this.ImportServ.getReciepts().subscribe((data) => {
        this.importReciets = data;
      });
    } else if (this.RefundType == 2) {
      this.ExpRecServ.getReciepts().subscribe((data) => {
        this.ExporReciept = data;
        this.ExporReciept.forEach((element) => {
          this.userServ.getUsersByID(element.userName).subscribe((Data) => {
            if (Data.type == UserType.Car) {
              this.SotreReciepts.push(element);
            }
          });
        });
      });
    } else if (this.RefundType == 3) {
      this.ExpRecServ.getReciepts().subscribe((data) => {
        this.ExporReciept = data;
        console.log(this.ExporReciept);
        this.ExporReciept.forEach((element) => {
          if (element.carID) {
            this.SotreReciepts.push(element);
          }
        });
      });
    }
  }
  add() {
    if (this.RefundType == 0) {
      this.route.navigate(['ExportRecRefund', this.recID]);
    } else if (this.RefundType == 1) {
      this.route.navigate(['ImportRecRefund', this.recID]);
    } else if (this.RefundType == 2) {
      this.route.navigate(['FromCarRecRefund', this.recID]);
    } else if (this.RefundType == 3) {
      this.route.navigate(['ToCarRecRefund', this.recID]);
    }
  }
}
