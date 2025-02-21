import {APP_INITIALIZER, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HeaderComponent} from './componets/header/header.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {authInterceptor} from './interceptor/auth.interceptor';
import {AuthService} from './services/http.authService';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor,
    multi: true
  },

  ]
})
export class AppComponent {
  title = 'VKRfront';
}
