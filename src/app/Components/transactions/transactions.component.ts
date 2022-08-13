import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { concatWith, Observable } from 'rxjs';
import { ITransactions } from 'src/app/Interface/ITransactions';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { TransactionsService } from 'src/app/Services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  //@Output() TransUpdated = new EventEmitter<ITransactions[]>();

  id: number;
  type: string;
  amount: number;
  date: Date;
  user: string;
  receiver: string;
  receiptID: number;
  receiptType: string;

  transact: ITransactions[] = [];
  // UpdatTrans =new this.UpdatTrans();

  transDELNUL = null;
  UserTransaction: FormGroup;
  constructor(private fb: FormBuilder, private Trans: TransactionsService) {
    this.UserTransaction = fb.group({
      type: [''],
      amount: [''],
      date: [''],
    });
  }

  addTrans() {
    this.Trans.addtransaction(this.UserTransaction.value).subscribe(
      (res: ITransactions) => {
        this.transact.push(res);
      }
    );
  }

  UpdateTrans() {
    this.Trans.updatetransaction(this.id, this.UserTransaction.value).subscribe(
      (upd: ITransactions) => {
        this.transact.push(upd);
      }
    );
  }

  ngOnInit(): void {
    this.getdatatotable();
  }

  getdatatotable() {
    this.Trans.gettransaction().subscribe((Date) => {
      this.transact = Date;
      // console.log(this.transact);
    });
  }

  deleteTrans() {
    console.log(this.id);
    this.Trans.deletetransaction(this.id).subscribe((Date) => {
      //   this.transDELNUL=Date;
      this.getdatatotable();
    });
  }

  updatetrans() {
    // this.Trans.updateReciept(this.id,).subscribe(result =>{
    // let updatingtransaction:ITransactions;
    // };
    // this.Trans.updatetransaction(this.id,updatingtransaction).subscribe();
  }
}

//    deletefromTable() {

//     //#region
//     const swalWithBootstrapButtons = Swal.mixin({
//      customClass: {
//        confirmButton: 'btn btn-success m-2',
//        cancelButton: 'btn btn-danger'
//      },
//      buttonsStyling: false
//    })

//    swalWithBootstrapButtons.fire({
//      title: 'حذف  المنتج',
//      text: 'هل انت متاكد من حذفه هذا المنتج',
//      icon: 'warning',
//      showCancelButton: true,
//      cancelButtonText: 'لا',

//      confirmButtonText: 'نعم',
//      reverseButtons: false
//    }).then((result) => {
//      if (result.isConfirmed) {

//        let prod:IExportProduct= this.ProductsAdded.find( pro => pro.productID == this.selectedid);
//        let index:number = this.ProductsAdded.indexOf( prod);
//        this.ProductsAdded.splice(index,1);
//        this.totalReciept();
//        this.getRemain();
//     swalWithBootstrapButtons.fire(
//        'تم الحذف',
//        'تم حذف المنتج',
//        'success'
//      )
//      } else if (
//        /* Read more about handling dismissals below */
//        result.dismiss === Swal.DismissReason.cancel
//      ) {
//        swalWithBootstrapButtons.fire(
//          'الغاء',
//          'لم يتم حذف المنتج',
//          'error'
//        )
//      }
//    })
//     //#endregion
//  }
//  changeTable(id:Number , quantity:number,price:number){
//    let pro = this.ProductsAdded.find(prod => prod.productID == id);
//    pro.quantity =  quantity;
//    pro.productPrice =  quantity;

//    pro.totalPrice = price * quantity;
//    this.totalReciept()
//  }
