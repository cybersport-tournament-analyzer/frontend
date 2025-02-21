import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {authGuardGuard} from './guards/auth/auth-guard.guard';
import {callbackGuard} from './guards/callback/callback.guard';
import {CallBackAuthComponent} from './componets/call-back-auth/call-back-auth.component';
import {ErrorPageComponent} from './pages/error-page/error-page/error-page.component';
import {LobbyPageComponent} from './pages/lobby-page/lobby-page.component';

export const routes: Routes = [
  {path:"login",component:LoginPageComponent},
  {path:"error", component: ErrorPageComponent},
  {path:"home", component: MainPageComponent,canActivate: [authGuardGuard]},
  {path:"callback-token",component: CallBackAuthComponent,canActivate: [callbackGuard]},
  {path:"lobby/:id",component: LobbyPageComponent,},

  {path:"",component: CallBackAuthComponent,canActivate: [authGuardGuard]}
];
