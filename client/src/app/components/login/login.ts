import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

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

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.checkIfAlreadyLoggedIn();
  }

  checkValid() {
    this.disableBtn = !this.loginForm.valid;
  }

  checkIfAlreadyLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.userService.identifyUser(token).subscribe((response) =>{
        console.log(response);
      });
    }
    else {
      return false;
    }
  }

  login() {
    this.userService.getUser(this.loginForm.getRawValue()).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    });
  }

}
