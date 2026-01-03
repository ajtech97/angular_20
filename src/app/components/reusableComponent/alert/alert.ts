import { NgClass } from '@angular/common';
import { Component, input, Input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert implements OnInit {

  // @Input() alertType: string = ""

  // Signal based input
  alertType = input<string>("")

  @Input() alertMessage: string = ""
  @Input() className: string = ""

  // Signal based output
  onClose = output<string>()

  ngOnInit(): void {
    //   if (this.alertType === "success") {
    //     this.className = "alert-success"
    //   }
    //   if (this.alertType === "warning") {
    //     this.className = "alert-warning"
    //   }
    this.onClose.emit("Alert Closed")
  }
}
