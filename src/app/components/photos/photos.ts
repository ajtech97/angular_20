import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Alert } from "../reusableComponent/alert/alert";
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-photos',
  imports: [HttpClientModule, FormsModule, Alert],
  templateUrl: './photos.html',
  styleUrl: './photos.css',
})
export class Photos implements OnInit {

  photosList: any
  http = inject(HttpClient)
  newPhoto: any = {
    "albumId": 0,
    "id": 0,
    "title": "",
    "url": ""
  }
  isFormSubmitted: boolean = false
  userService = inject(UserService)

  ngOnInit(): void {
    this.getAllPhotos()
  }

  getAllPhotos() {
    this.userService.getPhotos().subscribe({
      next: (res) => {
        this.photosList = res
        alert("Success")
      },
      error: (err) => {
        alert("Error")
      }
    })
  }

  onSavePhoto(form: NgForm) {
    this.isFormSubmitted = true
    if (form.valid) {
      this.http.post("https://jsonplaceholder.typicode.com/photos", this.newPhoto).subscribe({
        next: (res) => {
          alert("Success")
          this.getAllPhotos()
          form.reset()
          this.isFormSubmitted = false
        },
        error: (err) => {
          alert("Error")
        }
      })
    }
  }

  onEditPhoto(data: any) {
    this.newPhoto = data
  }

  onUpdatePhoto() {
    this.http.put("https://jsonplaceholder.typicode.com/photos/" + this.newPhoto.id, this.newPhoto).subscribe({
      next: (res) => {
        alert("Success")
        this.getAllPhotos()
      },
      error: (err) => {
        alert("Error")
      }
    })
  }

  onDeletePhoto(id: number) {
    const isDelete = confirm("Are you sure?")
    if (isDelete) {
      this.http.delete("https://jsonplaceholder.typicode.com/photos/" + id).subscribe({
        next: (res) => {
          alert("Success")
          this.getAllPhotos()
        },
        error: (err) => {
          alert("Error")
        }
      })
    }
  }

}
