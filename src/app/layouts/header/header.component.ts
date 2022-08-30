import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  UserName: string;
  Type: string;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.UserName = JSON.parse(localStorage.getItem('UserName'));
    this.Type = JSON.parse(localStorage.getItem('Type'));
  }

  Logout() {
    localStorage.removeItem('Token'),
      localStorage.removeItem('UserName'),
      localStorage.removeItem('Type');
  }

  ngOnInit(): void {}
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
