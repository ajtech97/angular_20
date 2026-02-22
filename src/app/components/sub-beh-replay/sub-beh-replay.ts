import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-sub-beh-replay',
  imports: [],
  templateUrl: './sub-beh-replay.html',
  styleUrl: './sub-beh-replay.css',
})
export class SubBehReplay implements OnInit {

  studentName$ = new Subject()

  rollNo$ = new Subject<number>()

  takeTill$ = new Subject<void>()

  courseName$: Subject<string[]> = new Subject<string[]>()

  userService = inject(UserService)


  constructor() {
    setTimeout(() => {
      this.studentName$.next("Angular 20")
      // this.rollNo$.next(123)
      // this.takeTill$.next()
      // this.courseName$.next(["Aj", "Ab"])
      // this.userService.$courseDuration.next("1 Month")
    }, 4000)
  }

  ngOnInit(): void {
    this.studentName$.subscribe((data) => {
      console.log(data)
    })

    // this.rollNo$.subscribe((data) => {
    //   console.log(data)
    // })

    // this.courseName$.subscribe((data) => {
    //   console.log(data)
    // })

    // this.userService.$courseDuration.subscribe((res: string) => {
    //   debugger
    // })

  }


}
