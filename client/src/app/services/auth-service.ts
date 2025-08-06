import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserService } from './user-service';
import { catchError, map, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private userService: UserService) { }

  isAuthenticated(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(false);
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.userService.identifyUser(token).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
