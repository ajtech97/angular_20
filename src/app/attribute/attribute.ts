import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-attribute',
  imports: [NgClass, NgStyle],
  templateUrl: './attribute.html',
  styleUrl: './attribute.css',
})
export class Attribute {


  studentList = [
    { name: "AAA", city: "Pune", status: true },
    { name: "BBB", city: "Mumbai", status: false },
    { name: "CCC", city: "Nagpur", status: false },
    { name: "DDD", city: "Banglore", status: true }
  ]

  textColor: string = "yellow"

  myCss: any = {
    "background-color": "blue",
    "color": "white",
    "font-size": "40px"
  }

}
