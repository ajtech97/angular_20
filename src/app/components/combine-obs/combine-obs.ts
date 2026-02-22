import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, concatMap, debounceTime, exhaustMap, filter, forkJoin, from, interval, map, mergeMap, of, Subject, switchMap, take, timer } from 'rxjs';

@Component({
  selector: 'app-combine-obs',
  imports: [ReactiveFormsModule],
  templateUrl: './combine-obs.html',
  styleUrl: './combine-obs.css',
})
export class CombineObs {

  stateData$ = of(["MP", "MH", "GOA"])
  cityData$ = of(["Pune", "Nagpur", "Mumbai"])

  search = new FormControl()

  login$ = new Subject<void>()

  http = inject(HttpClient)

  constructor() {
    // from([10, 20, 30]).subscribe(console.log);
    // this.stateData$.subscribe(data => console.log("state data", data))
    // timer(2000).subscribe(val => console.log(val));

    // ForkJoin - combine multiple subscription : eg- dashboard

    // of(1, 2, 3)
    //   .pipe(map(x => x * 10))
    //   .subscribe(console.log);

    // of(1, 2, 3, 4)
    //   .pipe(filter(x => x % 2 === 0))
    //   .subscribe(console.log);

    // of(1, 2, 3, 4).pipe(
    //   filter(data => data % 2 === 0)
    // ).subscribe(res => console.log(res))

    // interval(1000)
    //   .pipe(take(3))
    //   .subscribe(console.log)

    // this.search.valueChanges.pipe(
    //   debounceTime(500)
    // ).subscribe(console.log)

    // combineLatest([
    //   of(1, 2, 3),
    //   of(2)
    // ]).subscribe(console.log);

    forkJoin([this.stateData$, this.cityData$]).subscribe((res) => {
      // debugger
    })

    // this.search.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     switchMap(value => this.http.get("https://jsonplaceholder.typicode.com/users"))
    //   )
    //   .subscribe(console.log);

    const $users = this.http.get("https://jsonplaceholder.typicode.com/users")
    const $posts = this.http.get("https://jsonplaceholder.typicode.com/posts")

    forkJoin([$users, $posts]).subscribe((res) => {
      // debugger
    }, error => {
      // debugger
    })


    // switchMap - Latest api will be triggered and previous api should get cancle out

    this.search.valueChanges.pipe(
      switchMap((search: string) => this.http.get("https://dummyjson.com/products/search?q=" + search))
    ).subscribe((data) => {
      console.log(data)
    })


    // mergeMap - All api will be triggered 

    // this.search.valueChanges.pipe(
    //   mergeMap((search: string) => this.http.get("https://dummyjson.com/products/search?q=" + search))
    // ).subscribe((data) => {
    //   console.log(data)
    // })

    // concatMap - One api will get executed at a time 

    // this.search.valueChanges.pipe(
    //   concatMap((search: string) => this.http.get("https://dummyjson.com/products/search?q=" + search))
    // ).subscribe((data) => {
    //   console.log(data)
    // })

    // exhaustMap - It wont trigger another api call if one api is in active state

    this.login$.pipe(
      exhaustMap(() => {
        return this.http.get("https://jsonplaceholder.typicode.com/users")
      })
    ).subscribe((data) => {

    })

  }

  onLogin() {
    this.login$.next()
  }

}
