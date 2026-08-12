# Ronak

Spring Boot 4.1 API with an Angular 21 frontend in `web/`.

## Requirements

- JDK 25
- Maven 3.6.3+
- Node.js 20.19+ or 22.12+ (for the Angular app)

## Backend

```bash
mvn spring-boot:run
```

The app starts on [http://localhost:8080](http://localhost:8080).

| Method | Path   | Description                          |
|--------|--------|--------------------------------------|
| GET    | `/user`  | Greeting with the current timestamp |
| POST   | `/data`  | Echoes the request body             |
| GET    | `/test`  | Logs a test invocation              |
| GET    | `/actuator` | Spring Boot Actuator               |

```bash
mvn test
```

## Frontend

```bash
cd web
npm install
npm start
```

The Angular app is served at [http://localhost:4200](http://localhost:4200). Production build: `npm run build`.

## Guides

- [Spring Boot 4.1](https://docs.spring.io/spring-boot/4.1/index.html)
- [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)
