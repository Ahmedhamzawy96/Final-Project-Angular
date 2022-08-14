import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf" ;

@Component({
  selector: 'app-spreports',
  templateUrl: './spreports.component.html',
  styleUrls: ['./spreports.component.css']
})
export class SpreportsComponent implements OnInit {

  @ViewChild('col',{static:false}) el! :ElementRef;

  title= 'Angular CLI ll & jsPDF';

  makePDF2(){

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
