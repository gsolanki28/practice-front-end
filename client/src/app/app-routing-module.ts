import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { UserRegister } from './components/user-register/user-register';
import { TaskList } from './components/task-list/task-list';


const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'register',
    component: UserRegister,
  },
  {
    path: 'home',
    component: TaskList,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
