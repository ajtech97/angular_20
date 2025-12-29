import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  http = inject(HttpClient)

  sumOfTwoNumbers(num1: number, num2: number) {
    return num1 + num2
  }

  getPhotos() {
    return this.http.get("https://jsonplaceholder.typicode.com/photos")
  }

}
