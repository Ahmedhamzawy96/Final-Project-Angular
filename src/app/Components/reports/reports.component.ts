import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf" ;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
