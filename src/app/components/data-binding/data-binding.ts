import { DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NaPipe } from '../pipes/na-pipe';
import { UserService } from '../services/user-service';

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

  userService = inject(UserService)

  constructor() {
    console.log(this.courseName)

    this.courseName = "Ang 20"
    console.log(this.courseName)

    setTimeout(() => {
      this.rollNumber = 777
    }, 5000)

    this.userService.$roleBhehavior.subscribe((res: string) => {
      debugger
    })
    this.userService.$roleSubject.subscribe((res: string) => {
      debugger
    })
  }

  showAlert() {
    alert("hi")
  }

  cityChange() {
    alert("city changed")
  }

}
