# RURAL HOUSE

Escapadas rurales a tu medida. 
Rural House es una aplicación que permite al usuario navegar de forma ágil y poder reservar la casa deseada. Además el usuario cuenta con un apartado donde puede ver todas las reservas que ha realizado en la aplicación y el detalle de la misma.

![Logo de mi proyecto](https://github.com/almudenadomenech/PROYECTO-GRUPO-5/blob/Almudena/FRONTEND/src/assets/img/Captura-home.PNG)


## Enlace de la presentación:
https://view.genial.ly/6601495aaa36ce001491b7f0/presentation-rural-house

### PASO 1: CREAR PROYECTO ANGULAR CON ENRUTADO

ng new FRONTEND --skip-git --style=css --routing=true --ssr=false

### PASO 2: ENTRAR AL PROYECTO

cd frontend

### PASO 3: INSTALAR BOOTSTRAP

ng add @ng-bootstrap/ng-bootstrap

### PASO 4: INSTALAR BOOTSTRAP-ICONS

npm i bootstrap-icons

En angular.json hay que agregar el bootstrap-icons.min.css a styles:

 "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/bootstrap-icons/font/bootstrap-icons.min.css",
              "src/styles.css"
            ],

### PASO 5: LEVANTAR EL BACKEND

En otra terminal:
json-server --watch db.json

### PASO 6: CREAR COMPONENTES

ng g c nombre del componente

### PASO 7: HACER EL ENRUTADO

Empezar con el list y luego detalle
Se pueden ir enrutando a medida que crece el proyecto.


### PASO 8: CREAR LA INTERFACES

1. Crear una carpeta dentro de app
2. Crear las rutas en el app.component.htm en el navbar

### PASO 9: HACER FORMULARIOS

En el ts del componente en imports, se añade ReactiveFormsModule.

1. house-form.component.ts crear el FormGroup con sus FormControl

2. house-form.component.html creado el <form> de HTML con Bootstrap

3. house-form.component.ts método save extraer los campos del formulario y crear un objeto House y enviarlo a backend con HttpClient método POST


#### PASOS:

1. ng generate component house-list

2. ng generate component house-detail

3. Enrutado en app.routes.ts

4. router-outlet en app.component.html

5. Copiar código: house-list.component.ts y house-list.component.html
    * agregar botones para llegar a house-form para crear (POST) y actualizar (PUT)

6. Copiar código: house-detail.component.ts y house-detail.component.html
    * agregar botón para llegar a house-form para actualizar (PUT)


## ACTUALIZAR ANGULAR

1. Desinstalar Angular:
  npm uninstall -g @angular/cli

2. Instalar la version:
  npm install -g @angular/cli@17.2.0

3. Crear proyecto:
ng new frontend --skip-git --style=css --routing=true --ssr=false

4. Boostrap:
  ng add @ng-bootstrap/ng-bootstrap



## FUNCIONALIDAD ACTUALIZAR PRODUCTO (PUT)

1. Capturar el id (1,2,3 ...) de la URL utilizando activatedRoute de forma igual al house-detail.

2. Una vez capturado el id, si existe, entonces hacer un GET con httpClient para traer el house por id, por ejemplo el casa 1.

3. Cargar los valores de la casa en el formulario de houseForm. De esta forma el formulario aparecerá con los valores de la casa ya cargados para editarlos.

4. En el método save, distinguir si existe id entonces hacer un update PUT, si no existe id entonces hacer un create POST.


# CREAR BACKEND

## DESCARGAR E INSTALAR POSTMAN

Descargar e instalar POSTMAN

https://www.postman.com/

Postman permite probar el backend.

### COMANDOS 

1. Crear proyecto backend:

nest new nest-BACKEND --skip-git --package-manager npm

2. Crear un controlador:
nest generate controller User

3. Levantar el servidor:
nest start --watch

## CREAR PROYECTO CON MYSQL

 1. nest  new nest-backend --skip-git --package-manager npm
 2. cd nest-backend
 3. npm install --save @nestjs/typeorm typeorm mysql2
 4. ng generate module database
 5. Añadir la configuración de MySQL
 6. Crear base de datos en MySQL Workbench
 7. user.model.ts
 8. ng generate controller User
 9. Inyectar Repository en el UserController


 ## CONFIGURACIÓN BASE DE DATOS

app.module.ts:

* TypeOrmModule.forRoot()
* TypeOrmModule.forFeature()


### Recuperar datos:

* Métodos @Get()
* Métodos @Get() con parámetros
* Métodos @Get() con parámetro y pipe ParseIntPipe
* Devolver string
* Devolver un objeto
* Devolver un array de
* Crear nuevos datos:

Método @Post()
@Body() para recibir un objeto en método @Post()
Actualizar datos existentes.

Borrar datos existentes

#### EJEMPLO:

nest generate controller Booking

Crear booking.model.ts dentro de la carpeta booking

* @Get() findAll
* @Get() findById
* @Post create
* @Put update
* @Delete deleteById


## FRONTEND

* interfaces con todos los model.ts

* Crear componentes: 

* Enrutado app.routers.ts

* Desarrollar los componentes:

  * house-list conectado a backend nestjs
  * house-detail conectado a backend nestjs
  * house-form conectado a backend nestjs

## SUBIDA DE ARCHIVOS EN BACKEND (MULTER)

Instalar en backend:

npm i -D @types/multer

## SEGURIDAD
En backen:

npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt

Crear el controlador de usuario:

login
register

En el FRONTEND:

libreria para decodificar el token en el frontend

npm install jwt-decode

En authentication:

1. ng generate guard authentication/role
dejar por defecto en la pregunta que te hace. Enter y ya está.
Se crea un archivo role.guards.ts en la carpeta.

2. Crear un intercetor
ng generate interceptor authentication/jwt


## VALIDAR TOKEN JWT EN BACKEND NESTJS


https://docs.nestjs.com/recipes/passport

Objetivo: validar el token JWT que llega en cada petición de angular de un usuario autenticado.

Esto permite proteger / agregar seguridad a los controladores, evitando que un usuario sin token pueda hacer peticiones a un método de un controlador.


Crear clase JwtStrategy que herede (extends) PassportStrategy


Asegurarse de haber ejecutado en backend:

npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt.

## USERS

Angular componentes:

* login
* register: solo crea, no edita

* account-form (mi perfil): solo editar, no crear

* user-list (para admin)
* user-detail (para admin)
* user-form (para admin)


# DISEÑO DE LA APP

  ### Logo: 
    Optamos por una estética minimalista, utilizando una combinación de blanco y
    negro para crear un impacto visual elegante y atemporal.

  ### Paleta de Colores: 
    La paleta de colores se basa en el tono #f57d00, un naranja cálido que evoca 
    la calidez y energía del amanecer, añadiendo un toque de vitalidad a la interfaz.

  ### Iconografía: 
    Se ha implementado una selección cuidadosa de iconos con el objetivo de mejorar la usabilidad
    y la experiencia del usuario, agregando claridad y cohesión visual a la aplicación.

  ### Imágenes: 
    Cada imagen ha sido meticulosamente elegida por la sensación de tranquilidad que transmite.
    Cada una de ellas invita al usuario a sumergirse en un entorno sereno y armonioso, fomentando 
    una experiencia de uso relajante y placentera.

  ### Tipografía: 
    Se ha optado por Montserrat, una fuente sans-serif ampliamente reconocida por su excelente 
    legibilidad y versatilidad. Su uso proporciona una apariencia moderna y profesional, garantizando
    una experiencia de lectura cómoda y sin esfuerzo para el usuario. 