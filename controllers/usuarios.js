const {response} = require('express');//Importa la funcion 'response' desde el modulo express

const {Router} = require('express');//Importa la funcion 'Router' desde el modulo express para crear rutas
const router = Router();//Crea una instancia de Router para definir las rutas de la aplicacion

const {usuariosGet, PromGet, usuariosPost, usuariosPut, usuariosDelete} = require('../controllers/user___');//Importa los controladores de las rutas de usuarios desde el modulo '../controllers/user___'

//Define rutas y asigna controladores a cada ruta
router.get('/', usuariosGet);//Define una ruta GET para la ruta base '/' y asigna el controlador 'usuariosGet' para manejar las solicitudes a esa ruta

//Ruta para obtener todos los usuarios (GET '/promedio')
router.get('/promedio', PromGet);//Define una ruta GET para la ruta '/promedio' y asigna el controlador 'PromGet' para manejar las solicitudes a esa ruta

router.post('/', usuariosPost);//Define una ruta POST para la ruta base '/' y asigna el controlador 'usuariosPost' para manejar las solicitudes a esa ruta

router.put('/', usuariosPut);//Define una ruta PUT para la ruta base '/' y asigna el controlador 'usuariosPut' para manejar las solicitudes a esa ruta

router.delete('/', usuariosDelete);//Define una ruta DELETE para la ruta base '/' y asigna el controlador 'usuariosDelete' para manejar las solicitudes a esa ruta

const bcrypt = require ('bcryptjs');//Importa el modulo bcryptjs para encriptar contraseñas

const usuariosGet = require ('../modules/usuarios') // Importar el modelo de usuario desde el modulo '../modules/usuarios'

const usuariosGet = async (req, res = response) => {
    const body = req.query;//Extrae los parametros de la consulta de la solicitud HTTP y los asigna a la variable 'body'

    const {q, nombre, page=1, limit} = req.query;//Extrae los parametros 'q', 'nombre', 'page' y 'limit' de la consulta de la solicitud HTTP y los asigna a variables individuales

    const usuarios = await usuarios.find();//consulta todos los documentos de la coleccion usuario

    res.json({
        usuarios //Devuelve un objeto JSON  con los usuarios obtenidos de la base de datos
    });
}

//controlar para la solicitud GET para  la ruta de usuarios
const PromGet = async (req, res = response) => {
    const body = req.query;//Extrae los parametros de la consulta

    const {q, nombre, page=1, limit} = req.query;//Extrae los parametros 'q', 'nombre', 'page' y 'limit' de la consulta de la solicitud HTTP y los asigna a variables individuales

    const usuarios = await usuarios.find();//consulta todos los documentos de la coleccion usuario

    usuarios.forEach(usuario => console.log(usuario.nombre));//Imprime el nombre de cada usuario en la consola

    res.json({
        msg: 'Prom API controlador',//Devuelve un mensaje indicado que es el controlador del promedio
        q,
        nombre,
        page,
        limit,
        usuarios//Devuelve un objeto JSON con los parametros de la consulta y los usuarios obtenidos de la base de datos
    });
}

const usuariosPost = async (req, res = response) => {
    const body = req.body;//Extrae el cuerpo de la solicitud HTTP y lo asigna a la variable 'body'

    let msg = '';//Inicializa una variable 'msg' vacia para almacenar mensajes de respuesta

    const usuario = new usuarios(body);//Crea una nueva instancia del modelo de usuario utilizando los datos del cuerpo de la solicitud

    const {nombre, email, password, rol, estado} = req.body;//Extrae los campos 'nombre', 'email' y 'password' del cuerpo de la solicitud y los asigna a variables individuales

    try{
        //Encripta la contraseña antes de guardarla en la base de datos
        const salt = bcrypt.genSaltSync(10);//Genera un salt para la encriptacion de la contraseña utilizando bcrypt
        usuario.password = bcrypt.hashSync(password, salt);//Encripta la contraseña utilizando el salt generado y la asigna al campo 'password' del usuario

        await usuario.save();//Guarda el nuevo usuario en la base de datos 
        msg = 'Usuario creado correctamente';//Asigna un mensaje de éxito a la variable 'msg'

    }catch(error){
        console.error(error);//Imprime el error en la consola
        
        if(error){
            if (error.name === 'ValidationError') {
                console.error(Object.values(error.errors).map(val => val.message));//Imprime un mensaje de error de validación en la consola

                msg = Object.values(error.errors).map(val => val.message)//Asigna un mensaje de error de validación a la variable 'msg' concatenando los mensajes de error individuales
            }
        }
    }

    console.log(msg);//Imprime el mensaje de respuesta en la consola

    res.json({
        msg:msg//Devuelve un objeto JSON con el mensaje de respuesta
    });
}

const usuariosPut = async (req, res = response) => {
    const body = req.body;//Extrae el cuerpo de la solicitud HTTP y lo asigna a la variable 'body'

    console.log(body);//Imprime el cuerpo de la solicitud en la consola

    const {nombre, email, password, rol, estado} = req.body;//Extrae los campos 'nombre', 'email', 'password', 'rol' y 'estado' del cuerpo de la solicitud y los asigna a variables individuales

    res.json({
        msg: 'Usuario Modificado correctamente',//Devuelve un mensaje indicando que el usuario ha sido modificado correctamente

        usuario// Devuelve un objeto JSON con los datos del usuario modificado
    })
}

const usuariosDelete = async (req, res = response) => {
    const body = req.body;//Extrae el cuerpo de la solicitud HTTP y lo asigna a la variable 'body'

    console.log(body);//Imprime el cuerpo de la solicitud en la consola

    const{nombre, email, password, rol, estado} = req.body;//Extrae los campos 'nombre', 'email', 'password', 'rol' y 'estado' del cuerpo de la solicitud y los asigna a variables individuales

    //busca y elimina usuario en la base de datos 
    const usuario = await usuarios.findOneAndDelete({email: email
    });//Busca un usuario en la base de datos utilizando el campo 'email' y lo elimina

    res.json({msg: 'Usuario eliminado correctamente', usuario})
}

module.exports = {
    usuariosGet,
    PromGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}

module.exports = router;//Exporta el router con las rutas definidas para que pueda ser utilizado en otros modulos