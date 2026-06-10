# Backend - Guía rápida de ejecución

## Requisitos

* Java 21
* Maven


## Variables de entorno

Configurar las siguientes variables antes de ejecutar el proyecto:



## Ejecutar el backend

Desde la carpeta `emotional-chatbot-backend`:

```bash
mvn spring-boot:run
```

o

```bash
./mvnw spring-boot:run
```

## Verificar que funciona

Probar:

```http
GET http://localhost:8080/api/health
```

Debe responder:

```text
Backend alive
```

## Endpoint de registro

```http
POST http://localhost:8080/api/auth/register
```

Body:

```json
{
  "correo":"test@test.com",
  "nombre":"test",
  "password":"123456"
}
```

## Notas

* La base de datos está montada en MongoDB Atlas.
* Los usuarios se almacenan en la colección `usuarios`.
* El correo es único, por lo que no se pueden registrar usuarios repetidos.

