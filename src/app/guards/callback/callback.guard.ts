import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/http.authService';

export const callbackGuard: CanActivateFn = async (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService); // Внедряем сервис

  if (route.queryParams["accessToken"]) {
    console.log("in callbackGuard", route.queryParams["accessToken"]);

    try {
      // Предположительно, auth() — это асинхронная операция (например, запрос на сервер)
      authService.auth(route.queryParams["accessToken"]).subscribe();
      router.navigate(['home']); // Навигация после успешного завершения запроса
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      router.navigate(['error']);
      // Здесь можно добавить обработку ошибки или редирект на страницу ошибки, если необходимо
    }
  }

  return true; // Возвращаем true, чтобы разрешить переход
};
