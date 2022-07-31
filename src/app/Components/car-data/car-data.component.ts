import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})
export class CarDataComponent implements OnInit {
 car:string[];
  constructor() { 
    this.car=["dmx","nissan","ch","toyota"];
  }

  ngOnInit(): void {
  }

}
