import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-combine-obs',
  imports: [],
  templateUrl: './combine-obs.html',
  styleUrl: './combine-obs.css',
})
export class CombineObs {

  stateData$ = of(["MP", "MH", "GOA"])
  cityData$ = of(["Pune", "Nagpur", "Mumbai"])

  http = inject(HttpClient)

  constructor() {

    forkJoin([this.stateData$, this.cityData$]).subscribe((res) => {
      debugger
    })

    const $users = this.http.get("https://jsonplaceholder.typicode.com/users")
    const $posts = this.http.get("https://jsonplaceholder.typicode.com/posts")

    forkJoin([$users, $posts]).subscribe((res) => {
      debugger
    }, error => {
      debugger
    })

  }

}
