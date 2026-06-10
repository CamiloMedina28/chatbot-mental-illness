Comandos para abrir los 3 terminales

1) Terminal del frontend

cd "c:\Users\santi\Documents\GitHub\All at new github\chatbot-mental-illness\emotional-chatbot-frontend"
pnpm install
pnpm dev

2) Terminal del servicio del modelo IA

cd "c:\Users\santi\Documents\GitHub\All at new github\chatbot-mental-illness\ia-service"
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

3) Terminal del backend

cd "c:\Users\santi\Documents\GitHub\All at new github\chatbot-mental-illness\emotional-chatbot-backend"
$env:JAVA_HOME='C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot'
.\mvnw.cmd spring-boot:run



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

