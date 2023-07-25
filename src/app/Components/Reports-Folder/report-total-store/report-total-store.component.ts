import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsers } from 'src/app/Interface/IUsers';
import { Itotaltranswithname, TransWitName } from 'src/app/Interface/trans-wit-name';
import { Transacwithtotal } from 'src/app/Interface/transacwithtotal';
import { ReportService } from 'src/app/Services/Reports/report.service';
import { UsersService } from 'src/app/Services/Users/users.service';

@Component({
  selector: 'app-report-total-store',
  templateUrl: './report-total-store.component.html',
  styleUrls: ['./report-total-store.component.css']
})
export class ReportTotalStoreComponent implements OnInit {

  constructor(
    private rout: ActivatedRoute,
    private repserv: ReportService,
    private userserv:UsersService
  ) {  }
  transactions: Itotaltranswithname ;
  source:any;
  users:IUsers[];
  transWitName:TransWitName[]
  BillDate: string = new Date().toLocaleString();
  Date: string = new Date().toLocaleString();
  date: Date[] = this.repserv.getDates();
  UserName:string ='';
  Total: number = 0;
  totalPaid: number = 0;
  get:number=0;
  paid:number=0;
  ngOnInit(): void {
  this.repserv.geTotalStore(this.date).subscribe
  ((data)=>{this.transactions=data
    this.userserv.getUsers().subscribe((data) => {
      this.users = data;
    this.users= this.users.filter(W=>W.type==0||W.type==1)
    })
    } )
    this.transWitName= this.transactions.transactionandname
  }
  Print() {
    let printContents = document.getElementById('print').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
  SelUser()
  {
   this.transWitName= this.transactions.transactionandname.filter(w=>w.transactions.userName==this.UserName)
   this.transWitName.forEach(element => {
    if (element.transactions.type==1)
    {
this.get+=element.transactions.paid;
    }
    else if (element.transactions.type==1)
    {
      this.paid+=element.transactions.paid;
    }
   });
  }
}
