import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: any = {
    "email": "",
    "password": ""
  }

  router = inject(Router)

  constructor() { }

  onLogin() {
    if (this.loginObj.email === "aj@yopmail.com" && this.loginObj.password === "123123") {
      localStorage.setItem("loginName", "aj@yopmail.com")
      this.router.navigate(['/data-binding'])
      alert("Login Successful")

    } else {
      alert("Please enter correct email and password")
    }
  }
}
