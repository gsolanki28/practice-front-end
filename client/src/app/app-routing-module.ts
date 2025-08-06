import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { UserRegister } from './components/user-register/user-register';
import { TaskList } from './components/task-list/task-list';
import { authGuard } from './auth/auth-guard';

@Component({
  selector: 'app-inline-test',
  template: `<h2>This is a test route</h2><p>You can put any test HTML here.</p>`
})
class InlineTestComponent {}

const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: UserRegister,
  },
  {
    path: '',
    component: TaskList,
    canActivate: [authGuard]
  },
  {
    path: 'test-route',
    component: InlineTestComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
