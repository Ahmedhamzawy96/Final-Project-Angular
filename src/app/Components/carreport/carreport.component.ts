import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-carreport',
  templateUrl: './carreport.component.html',
  styleUrls: ['./carreport.component.css'],
})
export class CarreportComponent implements OnInit {
  @ViewChild('col', { static: false }) el!: ElementRef;

  title = 'Angular CLI ll & jsPDF';

  makePDF3() {
    let pdf = new jsPDF('p', 'pt', 'a1');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('customer.pdf');
      },
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
