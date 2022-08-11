import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/Interface/ISupplier';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/Services/Supplier/supplier.service';
import { IImportProduct } from 'src/app/Interface/IImportProduct';
import { IProduct } from 'src/app/Interface/IProduct';
import { ProductService } from 'src/app/Services/Product/product.service';

@Component({
  selector: 'app-import-reciept',
  templateUrl: './import-reciept.component.html',
  styleUrls: ['./import-reciept.component.css']
})
export class ImportRecieptComponent implements OnInit {
  BillDate:string = new Date().toUTCString();
  UserName:string;
  ImportProducts: IImportProduct [];
  Products:IProduct[];
  totalreciept:number;
  ImportRecieptForm:FormGroup;
  ImportProductFrom:FormGroup;
  protected Suppliers: ISupplier [] =[];
  public supplierCtrl: FormControl = new FormControl();
  constructor(private SuppServ:SupplierService , private ProdServ:ProductService) { 
    // ImportReciept From
    this.ImportRecieptForm = new FormGroup({
      total:new FormControl(this.totalReciept),
      notes:new FormControl(''),
      date:new FormControl(this.BillDate),
      paid:new FormControl(''),
      remaining:new FormControl(''),
      supplierID :new FormControl(''),
      supplierName:new FormControl('',[Validators.required]),
      userName:new FormControl('')
    })

    //ImportProduct 
    this.ImportProductFrom = new FormGroup( {
      //importRecieptID:new FormControl(''),
      productID:new FormControl(''),
      productName:new FormControl(''),
      quantity:new FormControl(''),
      totalPrice:new FormControl(''),
      buyingPrice:new FormControl(''),
    })
  }
  totalReciept(){
    let total:number=0;
    for(let item of this.Products){
      total += (item.quantity * item.buyingPrice);
    }
    this.totalreciept = total;
  }

  ngOnInit(): void {
    this.SuppServ.getSupplier().subscribe(Data => {
      this.Suppliers = Data
      console.log(Data , "Data")
      console.log(this.Suppliers , "Supp");
    })
    this.ProdServ.getProducts().subscribe(Data => {
      this.Products = Data
    })
  }
}
