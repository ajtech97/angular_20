import { Component } from '@angular/core';
import { from, interval, Observable, of, timer } from 'rxjs';

@Component({
  selector: 'app-rxjs-demo',
  imports: [],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})
export class RxjsDemo {

  cityList$ = of(["Pune", "Nagpur", "Mumbai"]);

  cityList2$ = from(["Pune", "Nagpur", "Mumbai"]);

  myInterval$ = interval(1000);

  timer$ = timer(5000);

  constructor() {

    const myObs$ = new Observable(value => {
      value.next('Hello RxJS');
    })

    myObs$.subscribe(value => {
      console.log(value);
    })

    this.cityList$.subscribe(value => {
      console.log('of city list', value);
    })

    this.cityList2$.subscribe(value => {
      console.log('from city list', value);
    })

    // this.myInterval$.subscribe(value => {
    //   console.log('interval', value);
    // })

    // this.timer$.subscribe(value => {
    //   console.log('timer', value);
    // })
  }

  cityList: string[] = [
    'New York',
    'Los Angeles',
    'Chicago'
  ];


}
