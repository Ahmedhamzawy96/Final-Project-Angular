import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'src/app/Interface/Enums/user-type';
import { IExportReciept } from 'src/app/Interface/IExportReciept';
import { IImportReciept } from 'src/app/Interface/IImportReciept';
import { ExportRecieptService } from 'src/app/Services/ExportReceipt/export-reciept.service';
import { ImportReceiptService } from 'src/app/Services/Import Receipt/import-receipt.service';
import { RefundService } from 'src/app/Services/Refund/refund.service';
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
    private refundServ: RefundService,
    private ImportServ: ImportReceiptService,
    private userServ: UsersService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  selectchange() {
    this.ExporReciept = [];
    this.SotreReciepts = [];
    this.importReciets = [];

    if (this.RefundType != 1) {
      this.refundServ.FilterReceipt(this.RefundType).subscribe((Data) => {
        this.SotreReciepts = Data;
      });
    } else {
      this.ImportServ.getReciepts().subscribe((data) => {
        this.importReciets = data;
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
