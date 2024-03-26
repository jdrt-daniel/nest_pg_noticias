# Instalación

### Características del backend

Este backend esta construido sobre el framework NestJs v10.\*, ademas se agregaron dependencias utiles para agregarle mayor funcionalidad.

- JWT
- Passport
- TypeORM
- PostgresSQL driver
- Cloudinary
- Swagger
- Docker

### Pasos para instalar el proyecto

1. Clonar el proyecto del repositorio

2. Ejecutar el comando `npm install`

3. Copiar el archivo `.env-template` y reemplazar el nombre con `.env`.

4. Cambiar las variables de entorno del archivo `.env` con la siguiente informacion

```
PORT=9000

FRONTEND_CLIENT=http://localhost:3000

CLOUDINARY_API_NAME=dttizsdoe
CLOUDINARY_API_KEY=287961743456775
CLOUDINARY_API_SECRET=cvs8pAd1oSdmxjlKOBVqLEnO7KM

DB_HOST=localhost
DB_PORT=5432
DB_NAME=observadordb
DB_USER=postgres
DB_PASS=postgres

JWT_SETRET=TestObservable
```

5. Levantar la base de datos (para esto se debe tener instaldo Docker Desktop)

```
docker-compose up -d
```

6. Levantar el proyecto

```
npm run start:dev
```

7. Insgresar a la documentación Swagger en la ruta

```
http://localhost:9000/swagger/doc
```

6. Ejecutar la data semilla desde swagger o postman

```
http://localhost:9000/api/seed
```
