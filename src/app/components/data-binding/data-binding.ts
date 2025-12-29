import { DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NaPipe } from '../pipes/na-pipe';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule, UpperCasePipe, LowerCasePipe, TitleCasePipe, SlicePipe, DatePipe, JsonPipe, NaPipe],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {

  courseName: string = "Angular 20"

  rollNoList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  isActive: boolean = false

  currentDate: Date = new Date()

  rollNumber: number = 123

  minLength: number = 5

  className: string = "spanclass"

  studentObj: any = {
    name: "Aj",
    city: "Nagpur",
    state: "",
    contact: {
      pContact: "9988776655",
      email: "official@gmail.com"
    }
  }

  constructor() {
    console.log(this.courseName)

    this.courseName = "Ang 20"
    console.log(this.courseName)

    setTimeout(() => {
      this.rollNumber = 777
    }, 5000)
  }

  showAlert() {
    alert("hi")
  }

  cityChange() {
    alert("city changed")
  }

}
