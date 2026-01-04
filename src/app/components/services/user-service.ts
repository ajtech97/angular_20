import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  $courseDuration: BehaviorSubject<string> = new BehaviorSubject<string>("2 Months")

  $roleBhehavior = new BehaviorSubject<string>("")
  $roleSubject = new Subject<string>()

  private userDetails = new Map<number, Observable<any>>()

  http = inject(HttpClient)

  user$: Subject<any> = new Subject<any>()

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

  getUserById(id: number): any | undefined {

    if (!this.userDetails.has(id)) {
      const userData = this.http.get("https://jsonplaceholder.typicode.com/users/" + id).pipe(
        shareReplay({
          bufferSize: 1,
          refCount: true
        })
      )
      this.userDetails.set(id, userData)
    }
    return this.userDetails.get(id)
  }

}
