import { LowerCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, LowerCasePipe],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo implements OnInit {

  // taskList: string[] = []
  taskList = signal<ITask[]>([])
  taskName: string = ''

  filteredTaskList = signal<ITask[]>([])
  isFilterRecordPresent = signal<boolean>(true);

  ngOnInit() {
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      this.taskList.set(JSON.parse(storedTasks));
      this.filteredTaskList.set(JSON.parse(storedTasks));
    }
  }

  addTask() {
    // debugger
    if (this.taskName.trim()) {
      const newTask: ITask = {
        taskName: this.taskName,
        taskStatus: 'New'
      };
      this.taskList.update(list => [...list, newTask]);
      this.filteredTaskList.set(this.taskList());
      localStorage.setItem("taskList", JSON.stringify(this.taskList()))

    }
  }

  onTextChange() {
    debugger
    const filterData = this.taskList().filter(item =>
      item.taskName.toLowerCase().startsWith(this.taskName.toLowerCase())
    );
    if (filterData.length != 0) {
      this.isFilterRecordPresent.set(true);
      this.filteredTaskList.set(filterData);
    } else {
      this.isFilterRecordPresent.set(false);
    }
  }

  onStatusFilter(event: any) {
    const status = event.target.value;
    if (status === 'All') {
      this.isFilterRecordPresent.set(true);
      const localData = this.taskList()
      this.filteredTaskList.set(localData);
    } else {
      const filterData = this.taskList().filter(item => item.taskStatus.startsWith(status));
      if (filterData.length != 0) {
        this.isFilterRecordPresent.set(true);
        this.filteredTaskList.set(filterData);
      } else {
        this.isFilterRecordPresent.set(false);
      }
    }
  }

  onChangeStatusFilter(event: any, item: ITask) {
    const status = event.target.value;
    item.taskStatus = status;

    this.taskList.set(this.filteredTaskList());
    localStorage.setItem("taskList", JSON.stringify(this.taskList()))
  }

}

export interface ITask {
  taskName: string;
  taskStatus: string
}
