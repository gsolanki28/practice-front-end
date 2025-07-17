import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list-item',
  standalone: false,
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.scss'
})
export class TaskListItem implements OnInit {
  isUpdateForm!: boolean;
  updatedTitle!: string;
  @Input() task!: Task;
  formattedDate!: string;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const rawDate = this.task.createdAt;
    this.formattedDate = new Date(rawDate).toLocaleString('en-US');
    console.log(this.formattedDate);
    
  }


  onDelete(item: Task) {
    if (item._id) {
      this.taskService.deleteTask(item._id).subscribe((response) => {
        console.log(response)
      });
    }
  }

  onUpdate(item: Task) {
    this.updatedTitle = item.title;
    this.isUpdateForm = true;
  }

  updateItem(item: Task, updatedTitle: string) {
    if (item._id) {
      item.title = updatedTitle;
      this.taskService.updateTask(item._id, item).subscribe((response) => {
        this.isUpdateForm = false;
      });
    }
  }

  onCancel() {
    this.isUpdateForm = false;
  }
}
