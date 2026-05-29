# Backend para gestión de usuarios

****

## Manual de usuario - Sin Docker

**Tecnología**: Spring Boot 3.5.14 / Java / JWT (JSON Web Tokens)

Esta sección del documento contiene las instrucciones necesarias para el despliegue incial del backend para la gestión de la autenticación de los usuarios.
Esta parte será de vital importancia para los desarrolladores front-end y personal de QA.

### Requisitos previos e instalación 

Para la ejecución de este backendse requieren unas tecologías básicas fundamentales. Siendo estas:
- Java JDK: Versión 17 o superior
- Gestor de dependencias: Maven, al ser este más sencillo.
- Motor de bases de datos: PostgreSQL

### Configuración del entorno

Hay ciertas variables que permiten la conexión con la base de datos, estas por razones de seguridad y de buenas prácticas, 
no pueden estar contenidas en el repositorio remoto. Es por ello, que el archivo application.yml está abierto a declarar
las variables de entorno y a su vez contiene algunos parámetros por default que no son estrictos.
- `DB_HOST`: Por default va a ser la maquina local (localhost).
- `DB_PORT`: El puerto en el cual está expuesto el dbms postgres.
- `DB_NAME`: El nombre de la base de datos
- `DB_USER`: La credencial de usuario para el inicio de sesión en la base de datos
- `DB_PASSWORD`: La credencial de contraseña para el inicio de sesión en la base de datos
- `JWT_SECRET`: El valor que permitirá la encriptación de los JWT.
- `JWT_EXPIRATION_MS`: El tiempo de expiración del JWT.
- `CORS_ALLOWED_ORIGIN`: Los origenes que no están bloqueados por la política CORS.

### Guía de uso de la API (SWAGGER - Catálogo de endpoints)

#### Endpoints públicos

##### Registro de usuarios

Error de usuario ya registrado en la base de datos
```json
{
    "timestamp": "2026-05-28T22:53:05.4612407",
    "status": 400,
    "message": "Ya existe una cuenta registrada con ese correo"
}
```

201
```json
{
    "message": "Usuario registrado correctamente"
}
```

##### Inicio de sesión

```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYW1pbG9AZ21haWwuY29tIiwidXNlcklkIjoxLCJpYXQiOjE3ODAwMjczMTQsImV4cCI6MTc4MDExMzcxNH0.mlczmOm51VPAajaSR62yNCsWPg1w2XSJmxFX2Xdw3DU",
    "type": "Bearer"
}
```

```json
{
    "timestamp": "2026-05-28T23:02:15.606106",
    "status": 401,
    "message": "Credenciales inválidas"
}
```


#### Endpoints privados

## Manual de usuario - Con docker


****

## Documentación técnica

### Autenticación

#### Controlador de autenticación y DTO

El controlador de autenticación es el que permite definir los endpoints relacionados con el registro de usuarios y el proceso de inicio
de sesión de los mismos. Además, es necesaria una base que indique como se debe generar la solicitud puesto que si no se recibe en este formato
la API no va a poder trabajar. A continuación, se indican los endpoints que manejan el proceso de autenticación y su estructura de solicitud
definida.
La base de estos endpoints va a estar dada siempre por: `/api/auth` y los endpoints disponibles son:
- `/register`: Para el registro de usuarios - En el directorio raiz en la carpeta de auth/dto está el estandar Register Request
- `/login`: Para el inicio de sesiópn - En el directorio raiz en la carpeta de auth/dto está el estandar Login Request

El DTO para el registro establece los siguientes valores y sus características

| Campo | Tipo | Obligatorio | Validaciones / Restricciones | Descripción |
| :--- | :--- | :---: | :--- | :--- |
| `nombre` | `String` | Sí | `@NotBlank`, `@Size(min = 3, max = 50)` | Nombre completo del usuario. Debe tener entre 3 y 50 caracteres. |
| `correo` | `String` | Sí | `@NotBlank`, `@Email` | Dirección de correo electrónico. Debe tener un formato de email válido. |
| `password` | `String` | Sí | `@NotBlank`, `@Size(min = 6, max = 255)` | Contraseña de acceso. Debe tener un mínimo de 6 caracteres. |

Por otro lado, el DTO para el inicio de sesión tiene las siguientes restricciones

| Campo | Tipo | Obligatorio | Validaciones / Restricciones | Descripción |
| :--- | :--- | :---: | :--- | :--- |
| `correo` | `String` | Sí | `@NotBlank`, `@Email` | Correo electrónico registrado del usuario. Debe cumplir con un formato válido. |
| `password` | `String` | Sí | `@NotBlank` | Contraseña del usuario asociada a la cuenta. |

### Message Response

Se crea esta clase con el fin de enviar mensajes de manera estándar como respuesta de la API. POr ejemplo, cuando el proceso 
de creación de un usuario se desarrolló de manera exitosa.

