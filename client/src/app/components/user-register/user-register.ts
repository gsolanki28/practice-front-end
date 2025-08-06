import { Router } from '@angular/router';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user-register',
  standalone: false,
  templateUrl: './user-register.html',
  styleUrl: './user-register.scss'
})
export class UserRegister implements OnInit {
  registerForm!: FormGroup;
  disableBtn = true;
  private router = inject(Router);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkIfAlreadyLoggedIn();
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  checkIfAlreadyLoggedIn() {
    this.authService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['']);
      }
    });
  }

  checkValid() {
    this.disableBtn = !this.registerForm.valid;
  }

  register() {
    this.userService.saveUser(this.registerForm.getRawValue()).subscribe((res) => {
      console.log(res);
    })
  }
}
