const {response} = require('express'); //Importar la funcion 'response' desde el modulo 'express'

//controlador para la solicitud get a la ruta de usuarios
const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'GET API'//Devuelve un objeto JSON con un mensjae indicando que se esta accendiendo a la API con GET
    });
};

//controlador para la solicitud post a la ruta de usuarios
const usuariosPost = (req, res = response) => {
    res.json({
        msg: 'POST API '//Devuelve un objeto JSON con un mensjae indicando que se esta accendiendo a la API con POST
    });
}

//Controlador para la solicitud put a la ruta de usuarios
const usuariosPut = (req, res = response) => {
    res.json({
        msg: 'PUT API '//Devuelve un objeto JSON con un mensjae indicando que se esta accendiendo a la API con PUT
    });
}

//Controlador para la solicitud delete a la ruta de usuarios
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API '//Devuelve un objeto JSON con un mensjae indicando que se esta accendiendo a la API con DELETE
    });
}

//Exporta los controladors de las rutas de usuarios para que esten disponibles para otros modulos
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}