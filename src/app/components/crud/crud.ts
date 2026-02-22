import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CrudService } from './service/crud.service';

interface User {
  id: number,
  name: string,
  email: string
}

@Component({
  selector: 'app-crud',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud implements OnInit {

  search$ = new BehaviorSubject<string>('');
  editingId: number | null = null;

  form: User = {
    id: 0,
    name: '',
    email: ''
  };

  filteredUsers$!: Observable<User[]>;

  constructor(private userService: CrudService) {
    // ✅ initialize here
    this.filteredUsers$ = combineLatest([
      this.userService.users$,
      this.search$
    ]).pipe(
      map(([users, search]) =>
        users.filter(u =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }

  ngOnInit(): void {

  }


  onSearch(value: string) {
    this.search$.next(value);
  }

  save() {
    if (!this.form.name || !this.form.email) return;

    if (this.editingId) {
      this.userService.update(this.form);
    } else {
      this.userService.add({
        ...this.form,
        id: Date.now()
      });
    }

    this.resetForm();
  }

  edit(user: User) {
    this.form = { ...user };
    this.editingId = user.id;
  }

  delete(id: number) {
    this.userService.delete(id);
  }

  resetForm() {
    this.form = { id: 0, name: '', email: '' };
    this.editingId = null;
  }
}
