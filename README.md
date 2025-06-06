# PredInvest

Веб-приложение PredInvest предоставляет пользователям инструменты для анализа текущего
состояния инвестиционного портфеля и оптимизации активов. Программа предназначена для работы с
данными о ценных бумагах и формирования рекомендаций на основе аналитических показателей и
алгоритмов машинного обучения.

## Основные функции

Сервис аунтефикации разработан на языке программирования **Go** и включает в себя следующие функции:

- Взаимодействие с базой данных (PostgreSQL) для хранения информации о пользователях.
- Реализация механизма аутентификации и авторизации пользователей на основе JWT (JSON Web Token).
- Удаление/изменение данных пользователей

Рекомендательная система разработана на языке программирования **Python** и включает в себя следующие функции:
- Обработка данных:
    - Расчёт ключевых финансовых метрик.
    - Подготовка данных для визуализации.
- Применение алгоритмов машинного обучения для анализа данных.
- Формирование ответов для клиентской части и отправка их пользователю.

Frontend приложения разработан на **React.js**. Для удобной и красивой отрисовки интерфейса используется библиотека компонентов **Ant Design**. Отображение интерактивных графиков и визуализация данных реализованы с помощью **Plotly.js**.

## Технологический стек

Для реализации сервиса аутентификации используются следующие библиотеки и инструменты:

- **Go** — основной язык программирования.
- **Chi** — маршрутизация HTTP-запросов.
- **PQ** — драйвер PostgreSQL для работы с базой данных.
- **Docker** — контейнеризация приложения.
- **PostgreSQL** — реляционная база данных для хранения инвестиционных данных.

Для реализации рекомендательной системы используются следующие библиотеки и инструменты:

- **Python** — основной язык программирования.
- **Flask** — маршрутизация HTTP-запросов.
- **Docker** — контейнеризация приложения.
- **Pandas** -  обработка данных
- **moexalgo** -  получение данных с Московской биржи

## Установка и запуск

### Требования:
- Docker (для контейнеризации)

### Локальный запуск

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/M1steryO/PredInvestDevServer.git
   cd PredInvestDevServer
   ```
2. Запустите build приложения
   ```sh
   docker compose build
   ```
3. Запустите приложение:
   ```sh
   docker compose up
   ```


