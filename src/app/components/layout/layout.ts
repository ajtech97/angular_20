import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  userService = inject(UserService)

  onRoleChange(event: any) {
    debugger
    this.userService.$roleBhehavior.next(event.target.value)
    this.userService.$roleSubject.next(event.target.value)
  }
}
