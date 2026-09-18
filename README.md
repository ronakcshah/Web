# Ronak

Spring Boot 4.1 API with an Angular 21 frontend in `web/`.

## Requirements

- JDK 25
- Maven 3.6.3+
- Node.js 20.19+ or 22.12+ (for building/serving the Angular app locally)

## API

| Method | Path        | Description                         |
|--------|-------------|-------------------------------------|
| GET    | `/user`     | Greeting with the current timestamp |
| POST   | `/data`     | Echoes the request body             |
| GET    | `/test`     | Logs a test invocation              |
| GET    | `/actuator` | Spring Boot Actuator                |

## Local development (live reload)

Run backend and frontend in two terminals. The Angular CLI proxies API calls to Spring, so the SPA can use relative URLs.

**Terminal A — Spring Boot** (http://localhost:8080):

```bash
mvn spring-boot:run
```

Spring Boot DevTools restarts the app after Java sources are recompiled (enable **Build on Save** / continuous compile in your IDE). An optional [LiveReload](https://chromewebstore.google.com/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) browser extension can refresh the page after a backend restart.

**Terminal B — Angular** (http://localhost:4200):

```bash
cd web
npm install
npm start
```

Frontend changes hot-reload via the Angular dev server. Open http://localhost:4200 — Home calls `GET /user` through the proxy.

## Local production-style check

Build the SPA into Spring’s static resources, then run a single server:

```bash
cd web
npm install
npm run build
cd ..
mvn spring-boot:run
```

Open http://localhost:8080. Angular output is written to `src/main/resources/public/` (gitignored). SPA deep links are forwarded by `Html5PathsController`.

## Testing

```bash
# Backend
mvn test

# Frontend
cd web
npm test
```

## Build (deployable JAR)

Build the frontend first so it is packaged into the JAR, then package with Maven:

```bash
cd web
npm ci
npm run build
cd ..
mvn -DskipTests package
```

Artifact: `target/Ronak-1.0.0.jar`.

## Server deployment

The server only needs **JDK 25**. Node.js is not required at runtime.

1. Copy `target/Ronak-1.0.0.jar` to the host.
2. Run:

```bash
java -jar Ronak-1.0.0.jar
```

3. Open `http://<host>:8080` — Spring serves the SPA and the REST API from the same origin.

Override the port if needed:

```bash
java -jar Ronak-1.0.0.jar --server.port=80
# or
SERVER_PORT=80 java -jar Ronak-1.0.0.jar
```

Use a process manager (`systemd`, etc.) for production and open the chosen port on the firewall. Do not rely on DevTools live reload in production.

## Guides

- [Spring Boot 4.1](https://docs.spring.io/spring-boot/4.1/index.html)
- [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)
