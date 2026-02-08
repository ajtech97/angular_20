import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { combineLatest, debounceTime, Subscriber } from 'rxjs';

@Component({
  selector: 'app-rxjs-reactive-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './rxjs-reactive-form.html',
  styleUrl: './rxjs-reactive-form.css',
})
export class RxjsReactiveForm implements OnInit {

  userForm!: FormGroup
  passwordMissmatch: boolean = false;
  searchResults: string[] = [];

  searchControl = new FormControl("")

  stateList: Signal<any[]> = signal<any[]>([
    { stateId: 1, stateName: "Maharashtra" },
    { stateId: 2, stateName: "Goa" },
    { stateId: 3, stateName: "Rajashthan" }
  ])

  cityList = signal([
    { cityId: 1, stateId: 1, cityName: "Mumbai" },
    { cityId: 2, stateId: 1, cityName: "Pune" },
    { cityId: 3, stateId: 2, cityName: "South Goa" },
    { cityId: 4, stateId: 3, cityName: "Jaipur" }
  ])

  selectedStateId = 0

  filteredCity = signal<any[]>([])

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      subscriber: [false],
      email: [''],
      password: [''],
      confirmPassword: [''],
      age: [''],
      drivingLicense: [''],
      country: [''],
      currency: [''],
      search: ['']
    });
  }

  http = inject(HttpClient)

  deptList = signal<any[]>([])
  designationList = signal<any[]>([])

  uploadedFileName: string = ""

  ngOnInit(): void {

    this.userForm.controls["name"].valueChanges.subscribe((res) => console.log(res))

    // this.searchControl.valueChanges.subscribe((res) => console.log(res))

    this.userForm.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.userForm.controls["confirmPassword"].disable()

    this.userForm.controls["password"].valueChanges.subscribe((res) => {
      if (res !== "") {
        this.userForm.controls["confirmPassword"].addValidators([Validators.required])
        this.userForm.controls["confirmPassword"].enable()
      }
    })

    this.userForm.statusChanges.subscribe((res) => {
    })

    combineLatest([
      this.userForm.controls["password"].valueChanges,
      this.userForm.controls["confirmPassword"].valueChanges
    ]).subscribe(([pwd, cnfpwd]) => {
      this.passwordMissmatch = pwd && cnfpwd && pwd !== cnfpwd
    })

    this.searchControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((search) => {
      console.log("search: ", search)
    })

    this.getAllDept()
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.userForm.reset()
  }

  onStateChange() {
    this.filteredCity.set(this.cityList().filter(city => city.stateId == this.selectedStateId))
    debugger
  }

  getAllDept() {
    this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments").subscribe({
      next: (res: any) => {
        this.deptList.set(res)
      }
    })
  }

  onDesignationByDeptChange(event: any) {
    this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId=" + event.target.value).subscribe((res: any) => {
      this.designationList.set(res)
    })
  }

  uploadFile(event: any) {
    debugger
    const formData = new FormData()
    formData.append("file", event.target.files[0])
    this.http.post("https://storeapi.gerasim.in/api/Customer/Upload", formData).subscribe({
      next: (res: any) => {

      },
      error: (err) => {

      }
    })
  }


}
