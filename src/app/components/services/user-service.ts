import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  http = inject(HttpClient)

  user$: Subject<any> = new Subject()

  sumOfTwoNumbers(num1: number, num2: number) {
    return num1 + num2
  }

  getPhotos() {
    return this.http.get("https://jsonplaceholder.typicode.com/photos")
  }

  getJsonUsers() {
    return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      tap((data: any) => {
        return this.user$.next(data)
      }),
      map((data: any) => data.map((data: any) => {
        return { id: data.id, name: data.name }
      })
      )
    )
  }

  getSingleUserAddress() {
    return this.http.get("https://jsonplaceholder.typicode.com/users/2").pipe(
      map((data: any) => data.address)
    )
  }

}
