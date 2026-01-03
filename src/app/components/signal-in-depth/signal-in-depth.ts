import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, ElementRef, Signal, signal, ViewChild, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Alert } from "../reusableComponent/alert/alert";

@Component({
  selector: 'app-signal-in-depth',
  imports: [JsonPipe, FormsModule, Alert],
  templateUrl: './signal-in-depth.html',
  styleUrl: './signal-in-depth.css',
})
export class SignalInDepth {

  courseName = signal("Angular")

  courseDuration = signal<string>("2 Months")

  cityList = signal<string[]>(["New York", "Los Angeles", "Chicago"])

  stateList: Signal<string[]> = signal<string[]>(["California", "Texas", "Florida"])

  studentObj = signal<any>({ name: "Aj", city: "Mumbai" })

  cityName: string = ""

  employeeObj = signal<any>({ empId: "", empName: "", empCity: "", empPinCode: "", empState: "" })

  fName = signal<string>("")
  mName = signal<string>("")
  lName = signal<string>("")

  // Any of the value of fName, mName, lName changes, fullName will re-compute
  fullName = computed(() => {
    return `${this.fName()} ${this.mName()} ${this.lName()}`
  })

  // Normal
  // @ViewChild('cityNameText') cityNameTextRef!: ElementRef;

  // Signal based ViewChild
  cityNameTextRef = viewChild<ElementRef<HTMLInputElement>>("cityNameText");

  constructor(private http: HttpClient) {
    const courseName = this.courseName()

    effect(() => {
      console.log("Full Name Updated: ", this.fullName())
    })

    this.cityNameTextRef()?.nativeElement

    // converting observable to signal
    const result = this.http.get("").subscribe((res) => { })
    const userList = toSignal(this.http.get<any[]>("https://jsonplaceholder.typicode.com/photos"), { initialValue: [] })
    console.log("User List: ", userList())
  }

  updateFName(event: any) {
    this.fName.set(event.target.value)
  }

  updateMName(event: any) {
    this.mName.set(event.target.value)
  }

  updateLName(event: any) {
    this.lName.set(event.target.value)
  }

  changeCourseName() {
    this.courseName.set("Angular 20")
  }

  changeArray() {
    this.cityList.set(["Thane", "Panvel", "Pune"])
    console.log(this.cityList())
  }

  addCity() {
    this.cityList.update(cities => ([...cities, this.cityName]))
  }

  onChangeFormValue(keyName: string, event: any) {
    const value = event.target.value
    this.employeeObj.update(emp => ({ ...emp, [keyName]: value }))

  }
}
