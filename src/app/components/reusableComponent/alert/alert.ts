import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert implements OnInit {

  @Input() alertType: string = ""
  @Input() alertMessage: string = ""
  @Input() className: string = ""

  ngOnInit(): void {
    //   if (this.alertType === "success") {
    //     this.className = "alert-success"
    //   }
    //   if (this.alertType === "warning") {
    //     this.className = "alert-warning"
    //   }
  }
}
