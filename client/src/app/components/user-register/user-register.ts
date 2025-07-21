import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-register',
  standalone: false,
  templateUrl: './user-register.html',
  styleUrl: './user-register.scss'
})
export class UserRegister implements OnInit {
  registerForm!: FormGroup;
  disableBtn = true;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  checkValid() {
    this.disableBtn = !this.registerForm.valid;
  }

  register() {
    this.userService.saveUser(this.registerForm.getRawValue()).subscribe((res)=>{
      console.log(res);
    })
  }
}
