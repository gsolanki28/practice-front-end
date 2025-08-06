import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TaskList } from './components/task-list/task-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskForm } from './components/task-form/task-form';
import { TaskListItem } from './components/task-list-item/task-list-item';
import { UserRegister } from './components/user-register/user-register';
import { Login } from './components/login/login';
import { AuthInterceptor } from './auth-interceptor';


@NgModule({
  declarations: [
    App,
    TaskList,
    TaskForm,
    TaskListItem,
    UserRegister,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // allows multiple interceptors
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
