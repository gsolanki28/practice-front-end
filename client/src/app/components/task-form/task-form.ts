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
      title: ['', [Validators.required, Validators.minLength(5)]],
      completed: [true],
      createdAt: [Date.now]
    });
  }

  onSubmit(): void {
    if (this.taskFormGroup.invalid) return;
    const taskData = this.taskFormGroup.getRawValue();
    this.taskService.addTask(taskData).subscribe(() => {
      this.taskFormGroup.reset({
        title: '',
        completed: true,
        createdAt: new Date()
      });
    });
  }
}
