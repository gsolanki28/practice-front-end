import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterUser, User } from "../models/user";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  getUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/login', user)
  }

  saveUser(user: RegisterUser): Observable<any> {
    return this.http.post('http://localhost:3000/register', user)
  }

  identifyUser(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/profile', { headers });
  }
}