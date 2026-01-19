import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { combineLatest, debounceTime, Subscriber } from 'rxjs';

@Component({
  selector: 'app-rxjs-reactive-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './rxjs-reactive-form.html',
  styleUrl: './rxjs-reactive-form.css',
})
export class RxjsReactiveForm implements OnInit {

  userForm!: FormGroup
  passwordMissmatch: boolean = false;
  searchResults: string[] = [];

  searchControl = new FormControl("")

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
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.userForm.reset()
  }


}
