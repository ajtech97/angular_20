import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  imports: [],
  templateUrl: './signal.html',
  styleUrl: './signal.css',
})
export class Signal {

  courseName: string = "Angular"

  angularVersion = signal("20")

  courseDuration = signal<string>("2 months")

  cityList = signal<string[]>(["Pune, Mumbai"])

  students = signal<any>({
    name: "Aj",
    city: "Pune"
  })

  changeDuration() {

    this.courseName = "React"

    this.courseDuration.set("3 months")
  }

  addCity() {
    this.cityList.update((oldValue: string[]) => [...oldValue, " Banglore", " Kolkata"])
  }

  changeCity() {
    this.students.update((oldValue: any) => ({ ...oldValue, city: "Thane" }))
  }

}
