import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  type: number = JSON.parse(localStorage.getItem('Type'));

  constructor() {}

  ngOnInit(): void {}
  ngDoCheck(): void {}
}
