import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnInit {
  taskFormGroup!: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      completed: [false],
      createdAt: [new Date('July 20, 69 00:20:18')]
    });
  }

  onSubmit(): void {
    if (this.taskFormGroup.invalid) return;
    const taskData = this.taskFormGroup.getRawValue();
    this.taskService.addTask(taskData).subscribe(() => {
      this.taskFormGroup.reset({
        title: '',
        completed: false,
        createdAt: new Date()
      });
    });
  }
}
