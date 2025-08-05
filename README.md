# TzTeyca

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 1. Страница входа

[Компонент](./src/app/login/login.ts)

## 2. Ограничение доступа

Создан [AuhthGuard](./src/app/shared/auth/auth.guard.ts)

## 3. Страница с клиентами

[Основной компонент](./src/app/home/home.ts)

## 4. Отправка пуш через модальное окно

[Компонент](./src/app/shared/components/push-dialog/push-dialog.ts)

Применяется [здесь](./src/app/home/home.ts)

## 5. Создание клиента

[Компонент - форма](./src/app/shared/components/client-form/client-form.ts)
Применяется [здесь](./src/app/home/home.ts)

[Кастомный компонент с реализацией ControlValueSelect](./src/app/shared/components/phone-number-input/phone-number.ts)