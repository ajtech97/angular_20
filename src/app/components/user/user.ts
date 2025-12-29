import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Highlight } from "../directives/highlight";
import { Alert } from '../reusableComponent/alert/alert';
import { Tabs } from "../reusableComponent/tabs/tabs";
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user',
  imports: [HttpClientModule, ReactiveFormsModule, AsyncPipe, Alert, Tabs, Highlight],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

  userForm: FormGroup = new FormGroup({
    userId: new FormControl(0),
    emailId: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    fullName: new FormControl("", [Validators.required]),
    mobileNo: new FormControl("", [Validators.required, Validators.minLength(10)])
  })

  http = inject(HttpClient)
  userService = inject(UserService)

  userList$: Observable<any[]>

  isFormSubmitted: boolean = false

  selectedViewName: string = "List View"

  constructor() {
    this.userList$ = this.http.get<any[]>("https://api.freeprojectapi.com/api/GoalTracker/getAllUsers")

    console.log(this.userService.sumOfTwoNumbers(10, 20))
  }

  onSaveUser() {
    const formValue = this.userForm.value
    this.isFormSubmitted = true
    this.http.post("https://api.freeprojectapi.com/api/GoalTracker/register", formValue).subscribe({
      next: (res) => {
        alert("success")
        this.isFormSubmitted = false
      },
      error: (err) => {
        alert("error")
      }
    })
  }

  onEditUser(data: any) {
    this.userForm = new FormGroup({
      userId: new FormControl(data.userId),
      emailId: new FormControl(data.emailId),
      password: new FormControl(data.password),
      fullName: new FormControl(data.fullName),
      mobileNo: new FormControl(data.mobileNo)
    })
  }

  // onUpdateUser(data: any) {
  //   const formValue = this.userForm.value
  //   this.userForm = new FormGroup({
  //     userId: new FormControl(data.userId),
  //     emailId: new FormControl(data.emailId),
  //     password: new FormControl(data.password),
  //     fullName: new FormControl(data.fullName),
  //     mobileNo: new FormControl(data.mobileNo)
  //   })

  //   this.http.put("https://api.freeprojectapi.com/api/GoalTracker/updateUser/" + this.userForm.value.userId, formValue).subscribe({
  //     next: (res) => {
  //       alert("success")
  //     },
  //     error: (err) => {
  //       alert("error")
  //     }
  //   })
  // }

  onReset() {
    this.userForm.reset()
  }

  onSelectTab(tabName: string) {
    this.selectedViewName = tabName
  }

}
