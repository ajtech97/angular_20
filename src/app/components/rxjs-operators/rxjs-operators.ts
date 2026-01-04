import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, from, interval, map, Observable, of, take } from 'rxjs';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-rxjs-operators',
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs-operators.html',
  styleUrl: './rxjs-operators.css',
})
export class RxjsOperators {

  noList$ = from([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])

  rollNoList$ = of([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])

  http = inject(HttpClient)

  userService = inject(UserService)

  timeInterval = interval(1000)

  searchControl: FormControl = new FormControl()

  constructor() {
    // this.noList$.subscribe((data) => {
    //   console.log(data);
    // })

    // this.noList$.pipe(
    //   filter((data) => data % 2 === 0)
    // ).subscribe(data => {
    //   console.log(data);
    // })

    // this.rollNoList$.pipe(
    //   map((data) => data.filter((no) => no % 2 === 0))
    // ).subscribe(data => {
    //   console.log(data);
    // })

    this.userService.getJsonUsers().subscribe((res: any) => {
      console.log(res)
    })

    // this.userService.getSingleUserAddress().subscribe((res: any) => {
    //   console.log(res)
    // })

    this.userService.user$.subscribe((data) => {
      console.log(data)
    })

    // this.timeInterval.pipe(
    //   filter((data) => data % 2 === 0)
    // ).subscribe((data) => {
    //   console.log(data)
    // })

    // this.searchControl.valueChanges.subscribe((data) => {
    //   console.log(data)
    // })

    // this.searchControl.valueChanges.pipe(
    //   filter((data) => data.length >= 3)
    // ).subscribe((data) => {
    //   console.log(data)
    // })

    // this.timeInterval.pipe(
    //   take(6)
    // ).subscribe((data) => {
    //   console.log(data)
    // })
  }
}
