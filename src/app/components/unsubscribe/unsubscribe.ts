import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  imports: [AsyncPipe],
  templateUrl: './unsubscribe.html',
  styleUrl: './unsubscribe.css',
})
export class Unsubscribe implements OnInit, OnDestroy {

  userList: any[] = []
  http = inject(HttpClient)

  //way 1
  subscription!: Subscription;

  //way 2
  subscriptionList: Subscription[] = []

  //way 3
  subTakeUntil: Subject<void> = new Subject<void>()

  // way 4 - take

  // way 5 - using async pipe
  userList$ = new Observable<any[]>

  ngOnInit(): void {
    this.getUsers()
    this.userList$ = this.http.get<any[]>("https://jsonplaceholder.typicode.com/users")
  }

  // getUsers() {
  //   this.subscription = this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
  //     this.userList = res
  //   })
  // }

  // getUsers() {
  //   this.subscriptionList.push(this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
  //     this.userList = res
  //   }))
  // }

  // getPosts() {
  //   const sub = this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((res: any) => {
  //     this.subscriptionList.push(sub)
  //   })
  // }

  // getUsers() {
  //   this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
  //     takeUntil(this.subTakeUntil)
  //   ).subscribe((res: any) => {
  //     console.log(res)
  //   })
  // }

  getUsers() {
    this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      take(1)
    ).subscribe((res: any) => {
      console.log(res)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe()
    })
    this.subTakeUntil.next()
  }

}
