import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';

export const routes: Routes = [
  {path:"login",component:LoginPageComponent},
  {path:"", component: MainPageComponent}
];
