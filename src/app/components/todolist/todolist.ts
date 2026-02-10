import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime, Subject } from 'rxjs';
import { SearchPipe } from '../../pipes/search-pipe';


interface Todo {
  task: string;
  completed: boolean;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, SearchPipe, MatTableModule, MatPaginator, MatInputModule],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})
export class Todolist implements OnInit {


  http = inject(HttpClient)

  newTask = ""
  todos: string[] = []

  addTodo() {
    if (this.newTask.trim()) {
      this.todos.push(this.newTask)
      this.newTask = ""
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1)
  }

  // count: number = 0

  // onIncrement() {
  //   this.count++
  // }

  // onDecrement() {
  //   if (this.count <= 0) {
  //     return
  //   }
  //   this.count--
  // }

  count = signal(0)

  onIncrement() {
    this.count.update(c => c + 1)
  }

  onDecrement() {
    if (this.count() <= 0) {
      return
    }
    this.count.update(c => c - 1)
  }

  // newTask = '';
  // todos: Todo[] = [];
  // filterType: string = 'all';

  // addTodo() {
  //   if (this.newTask.trim()) {
  //     this.todos.push({ task: this.newTask, completed: false });
  //     this.newTask = '';
  //   }
  // }

  // removeTodo(index: number) {
  //   this.todos.splice(index, 1);
  // }

  // toggleStatus(todo: Todo) {
  //   todo.completed = !todo.completed;
  // }

  // getFilteredTodos() {
  //   if (this.filterType === 'completed') {
  //     return this.todos.filter(t => t.completed);
  //   } else if (this.filterType === 'pending') {
  //     return this.todos.filter(t => !t.completed);
  //   }
  //   return this.todos;
  // }

  subject = new Subject<number>();


  users: any[] = []
  searchText = ""
  filteredUsers: any[] = []

  searchSubject = new Subject<string>();


  displayedColumns: string[] = ['id', 'name', 'email'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  allData: number[] = [];
  visibleData: number[] = [];

  batchSize = 20;
  currentIndex = 0;

  ngOnInit() {

    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(text => {
      this.fetchUsers(text);
    });

    this.fetchData()
    this.fetchUsersTable()

    // Create dummy 100 items
    this.allData = Array.from({ length: 100 }, (_, i) => i + 1);
    this.loadMore();


    this.subject.next(1);
    // this.subject.next(2);

    this.subject.subscribe(val => console.log(val)); // Will NOT get 1,2

    this.subject.next(3); // Output: 3
  }

  loadMore() {
    const nextItems = this.allData.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize
    );

    this.visibleData = [...this.visibleData, ...nextItems];
    this.currentIndex += this.batchSize;
    console.log("load")
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadMore();
    }
  }

  fetchData() {
    this.http.get<any[]>("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
      this.users = res
      this.filteredUsers = res
    })
  }

  searchUser() {
    this.filteredUsers = this.users.filter(u => u.name.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  fetchUsers(search: string) {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.filteredUsers = data.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  fetchUsersTable() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
