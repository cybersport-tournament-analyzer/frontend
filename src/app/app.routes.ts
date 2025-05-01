import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {authGuardGuard} from './guards/auth/auth-guard.guard';
import {callbackGuard} from './guards/callback/callback.guard';
import {CallBackAuthComponent} from './componets/call-back-auth/call-back-auth.component';
import {ErrorPageComponent} from './pages/error-page/error-page/error-page.component';
import {LobbyPageComponent} from './pages/lobby-page/lobby-page.component';
import {TournamentPageComponent} from './pages/tournament-page/tournament-page.component';
import {MatchPageComponent} from './pages/match-page/match-page.component';

export const routes: Routes = [
  {path:"login",component:LoginPageComponent},
  {path:"error", component: ErrorPageComponent},
  {path:"home", component: MainPageComponent,canActivate: [authGuardGuard]},
  {path:"callback-token",component: CallBackAuthComponent,canActivate: [callbackGuard]},
  {path:"lobby/:id",component: LobbyPageComponent,},
  {path:"tournament/:id",component: TournamentPageComponent,},
  {path:"match/:id",component: MatchPageComponent,},

  {path:"",component: CallBackAuthComponent,canActivate: [authGuardGuard]},
  { path: '**', component: ErrorPageComponent } // Перехват несуществующих путей
];
