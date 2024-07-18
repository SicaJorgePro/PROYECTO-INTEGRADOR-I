# <font color="red">Proyecto basado en Node.js y MongoDB con CRUD </font>
***
✒ Con NodeJS, se utilizan las librerías de express para la creación de rutas y mongodb; que permiten crear un cliente de base de datos y realizar la conexión y administración con MongoDB Atlas.

### Librerías para este Proyecto
  :+1: dotenv

  :+1: ejs

  :+1: express

  :+1:mongodb

  :+1:Nodemon (dependencia)

## Características.

- El sistema utiliza la librería de express para crear las rutas y el servidor.

- Trabaja con la librería  dontev, es para utilizar varibales de entorno.

- Utiliza vistas parciales y layouts para el diseño.

- Se utiliza la librería ejs para realizar motores de plantilla y poder unir javacrip con html .

- Utiliza <u>**Ruters, Controladores y Módulos**
</u> que permite organizar las rutas de nuestra aplicación de manera modular y fácil de mantener.

-  Utilización de bootstrap con enlace de css y css propio para darle estilo a las  vistas.  

- El sistema utiliza la librería de mongodb para interactuar con la base de datos NoSQL.

- El sistema realiza todas las operaciones de un CRUD mediante las peticiones GET- POST - PUT y DELETE. Utilizando el servicio ***Thunder-Cliente***.

##  Datos necesarios que se requieren:
 :point_right: El archivo **env-example** esta vacío, remplazarlo por el archivo **env** 

- Puerto

- Conexión

- base

- colección_base          

⚠ Necesitan estos datos para el funcionamiento del proyecto ya que trabaja con variables de entorno. **Advertencia!** colocar el nombre de la <u>**BASE**</u> entre comillas y la <u>**COLECCION_BASE**</u> también 


### Estructura de la base de datos
Deberá estar compuesto por 6 campos:

                💾 id
                💾 nombre
                💾 importe
                💾 categoría
                💾 stock
                💾 _id (se genera solo al crear por cada registro de la colección)

En el proyecto hay una :file_folder: carpeta llamada **JSON** donde está el archivo <u>**computacion.json**</u> para importar como colección de la base creada y además consta de 50 registros.

 #### 🗃 ARCHIVO JSON 		
``` JSON
[
  {
    "id":1,
    "nombre": "Teclado",
    "importe":20,
    "categoria": "Periféricos",
    "stock": 10
  },
	......
```
## INSTALACION.

>Cargar los node_modules para poder ejecutar el servidor 

**`npm install`**

> Para ejecutar el servidor poner 

**`node run dev`**

## Tecnología.

- Se utiliza nodeJS como entorno de ejecución.

- Para almacenar los datos se utiliza una base de datos NoSQL. MongoDB

- La aplicación está programada en el lenguaje de programación javascript.


### Para realizar las peticiones de rutas:
***

- get "/" (indica el inico, la portada del proyecto presionando el link INICIO del menú o
por medio de la url 
> http://localhost:3008/

- get "/productos" ( indica mostrar todos los productos, puede escribir la ruta o presionar el link del menú que dice PRODUCTO-ALL)

- get "/productos/23" (indica que para mostrar por código de registro la base consta con 50 productos con un id del 1 al 50, la única manera de ver es escribir en la url la ruta) ejemplo:
> http://localhost:3008/productos/25

- get "/productos/categorias/periféricos"(indica que para mostrar por categoría los productos, la única manera de poder visualizarlo es escribir por ruta )
ejemplo:
> http://localhost:3008/productos/categorias/perifericos

o
> http://localhost:3008/productos/categorias/software

Puede utilizar el navegador, o utilizar la aplicación como Postman o Thunder-Cliente. En este caso recomiendo el navegador por tener algunos motores de platillas para generar una presentación más adecuada, y además si hay algún error como 404 o 500 se representa por una plantilla. 
Esto lo puede ver en forma de imagen en la carpeta **docs** donde esta representada cada situación mencionada.

## PETICIONES DE POST, PUT Y DELETE 
___

#### ESTAS PETICIONES SE TRABAJAN con THUNDER CLIENTE O POSMAN

- POST"/productos" ( crea una nuevo REGISTRO), utilizando el cuerpo del body de JSON con el registro.

- PUST"/productos/:id" (Modifica el registro, necesita un id para poder localizar el registro) 

- DELETE"/productos/:id" (elimina un registro, necesita un id para localizar el registro)

En la carpeta **docs** se encuentra subcarpeta con post, put y deletes donde observará imagenes de las peticiones de cada una 

## AUTOR:
### :+1: **SICA, JORGE** :+1:
#### END
****







