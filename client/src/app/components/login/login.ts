import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  disableBtn = true;

  private router = inject(Router);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkIfAlreadyLoggedIn();
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  checkValid() {
    this.disableBtn = !this.loginForm.valid;
  }

  checkIfAlreadyLoggedIn() {
    this.authService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['']);
      }
    });
  }

  login() {
    console.log('Login clicked');
    this.userService.getUser(this.loginForm.getRawValue()).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['']);
    });
  }

}
