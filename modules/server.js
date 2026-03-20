require('dotenv').config();//Carga las variables de entorno desde un archivo .env utilizando la biblioteca 'dotenv'

const Server = require('./modules/server');//Importa la clase Server desde el modulo './modules/server'

const server = new Server();//Crea una nueva instancia de la clase Server y la asigna a la variable 'server'

server.listen();//Llama al metodo 'listen' del servidor para iniciar la aplicacion y escuchar las solicitudes entrantes en el puerto especificado en las variables de entorno

const express = require('express');

const {dbConnection} = require('../database/config');//Importa la funcion de conexion a la base de datos desde el modulo '../database/config'

const cors = require ('cors')

const bodyParser = require('body-parser');

class Server {
    constructor(){
        this.app = express();//Crea una instancia de la aplicacion Express y la asigna a la propiedad 'app' del servidor
        this.port = process.env.PORT;//Asigna el puerto de escucha del servidor a partir de la variable de entorno PORT
        this.usuariosPath = '/api/usuarios';//Define la ruta base para las operaciones relacionadas con los usuarios
        this.authPath = '/api/auth';//Define la ruta base para las operaciones relacionadas con la autenticacion

        this.middlewares();//Llama al metodo 'middlewares' para configurar los middlewares de la aplicacion
        this.routes();//Llama al metodo 'routes' para configurar las rutas de la aplicacion
        this.conectarDB();//Llama al metodo 'conectarDB' para establecer la conexion a la base de datos
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.static(__dirname + '/public'));
    }

    routes(){
        //configurar las rutas de la aplicacion
        this.app.use(this.usuariosPath, require('../routes/usuarios'));//Configura las rutas para las operaciones relacionadas con los usuarios utilizando el modulo '../controllers/usuarios'
        this.app.use(this.authPath, require('../routes/auth'));//Configura las rutas para las operaciones relacionadas con la autenticacion utilizando el modulo '../controllers/auth'
    }

    async conectarDB(){
        await dbConnection();//Establece la conexion a la base de datos llamando a la funcion 'dbConnection'
    }
}

module.exports = Server;//Exporta la clase Server para que pueda ser utilizada en otros modulos