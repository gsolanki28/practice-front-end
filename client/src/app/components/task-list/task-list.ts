import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList implements OnInit {
  taskLists!: Task[];
  filteredTaskLists!: Task[];
  baseFilteredTaskLists!: Task[];
  searchText!: string;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((response) => {
      this.taskLists = response;
    })
    this.filteredTaskLists = this.taskLists;
    this.baseFilteredTaskLists = this.taskLists;
  }

  onSelect(event: any) {
    if (event.target.value === 'active') {
      this.baseFilteredTaskLists = this.taskLists.filter(task => !task.completed)
    }
    else if (event.target.value === 'completed') {
      this.baseFilteredTaskLists = this.taskLists.filter(task => task.completed)
    }
    else {
      this.baseFilteredTaskLists = this.taskLists;
    }
    this.filteredTaskLists = [...this.baseFilteredTaskLists];
  }
  onSort(event: any) {
    if (event.target.value === 'date') {
      this.filteredTaskLists = this.baseFilteredTaskLists.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    else if (event.target.value === 'text') {
      this.filteredTaskLists = this.baseFilteredTaskLists.sort((a, b) => a.title.localeCompare(b.title));
    }
    else {
      this.filteredTaskLists = this.baseFilteredTaskLists;
    }
  }

  onSearch(event:any){
    console.log(event);
    this.filteredTaskLists = this.baseFilteredTaskLists.filter(task => task.title.includes(event))
  }

}
