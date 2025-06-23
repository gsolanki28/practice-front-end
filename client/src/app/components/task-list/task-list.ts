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
  
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((response) => {
      this.taskLists = response;
    })
  }

}
