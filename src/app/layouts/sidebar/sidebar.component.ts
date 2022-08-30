import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  Type: number;
  constructor() {
    this.Type = JSON.parse(localStorage.getItem('Type'));
  }

  ngOnInit(): void {}
}
