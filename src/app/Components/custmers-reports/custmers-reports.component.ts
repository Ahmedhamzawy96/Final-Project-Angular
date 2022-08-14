import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf" ;

@Component({
  selector: 'app-custmers-reports',
  templateUrl: './custmers-reports.component.html',
  styleUrls: ['./custmers-reports.component.css']
})
export class CustmersReportsComponent implements OnInit {

  @ViewChild('col',{static:false}) el! :ElementRef;

title= 'Angular CLI ll & jsPDF';

makePDF(){

  let pdf= new jsPDF('p','pt','a1');
  pdf.html(this.el.nativeElement,
  {
    callback: (pdf)=>{
      pdf.save("customer.pdf");
    }
  });

}

  constructor() { }

  ngOnInit(): void {
  }

}
