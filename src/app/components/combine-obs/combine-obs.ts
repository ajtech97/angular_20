import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { concatMap, exhaustMap, forkJoin, mergeMap, of, Subject, switchMap } from 'rxjs';

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

    // ForkJoin - combine multiple subscription : eg- dashboard

    forkJoin([this.stateData$, this.cityData$]).subscribe((res) => {
      // debugger
    })

    const $users = this.http.get("https://jsonplaceholder.typicode.com/users")
    const $posts = this.http.get("https://jsonplaceholder.typicode.com/posts")

    forkJoin([$users, $posts]).subscribe((res) => {
      // debugger
    }, error => {
      // debugger
    })


    // switchMap - Latest api will be triggered and previous api should get cancle out

    // this.search.valueChanges.pipe(
    //   switchMap((search: string) => this.http.get("https://dummyjson.com/products/search?q=" + search))
    // ).subscribe((data) => {
    //   console.log(data)
    // })


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
