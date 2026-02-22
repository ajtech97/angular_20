import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number,
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  private usersSubject = new BehaviorSubject<User[]>([
    { id: 1, name: "Ajinkya", email: "aj@yopmail.com" },
    { id: 2, name: "Harsh", email: "harsh@yopmail.com" }
  ])

  users$ = this.usersSubject.asObservable();

  add(user: User) {
    const users = this.usersSubject.value
    this.usersSubject.next([...users, user])
  }

  update(updatedUser: User) {
    const users = this.usersSubject.value.map(u =>
      u.id === updatedUser.id ? updatedUser : u
    )
    this.usersSubject.next(users)
  }

  delete(id: number) {
    const users = this.usersSubject.value.filter(u => u.id !== id);
    this.usersSubject.next(users);
  }

}
