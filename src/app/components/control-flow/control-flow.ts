import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-flow',
  imports: [FormsModule],
  templateUrl: './control-flow.html',
  styleUrl: './control-flow.css',
})
export class ControlFlow {


  selectedCast: string = ""

  isStudentActive = signal<boolean>(false)

  cityList: string[] = ["Pune", "Mumbai", "Nagpur", "Banglore"]

  studentList = [
    { name: "AAA", city: "Pune", status: true },
    { name: "BBB", city: "Mumbai", status: false },
    { name: "CCC", city: "Nagpur", status: false },
    { name: "DDD", city: "Banglore", status: true }
  ]

  changeStatus(value: boolean) {
    this.isStudentActive.set(value)
  }

}
