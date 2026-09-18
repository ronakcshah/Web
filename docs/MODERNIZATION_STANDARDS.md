# Modernization Standards

This document is the source of truth for what "modern" means in this codebase. Code drifts out of compliance quietly, and this is how we catch it. 

## Backend (Java / Spring Boot)

1. **No** `javax.`* **imports.** This project targets Jakarta EE 11 (Spring Boot 4.x), so anything like `javax.servlet` or `javax.persistence` needs to be `jakarta.`* instead.
2. **Tests use JUnit 5** (`org.junit.jupiter.`*). No `org.junit.Test`, `@RunWith`, or `SpringRunner`, those are JUnit 4 patterns and no longer supported here.
3. **Actuator endpoint exposure must be explicit.** `application.properties` should set `management.endpoints.web.exposure.include` to a specific, minimal list rather than relying on whatever the framework defaults to.
4. **Security Reviews** Make sure you review the code for SQL injection risks, XSS vulnerabilities, Hardcoded secrets or credentials and insecure data exposure.

## Frontend (Angular)

1. **Components should be standalone.** New and existing components should use `standalone: true` rather than being declared inside an `NgModule`.
2. **No hardcoded credentials or tokens in source.** Any literal string that looks like an API key, auth token, or secret should be flagged, even if it's just a placeholder value.
3. **Security Reviews** Make sure you review the code for PII leakage, consent bypass, weak token storage, session/path hijacking, form auto-fill protection.

## Known issues

None currently documented.