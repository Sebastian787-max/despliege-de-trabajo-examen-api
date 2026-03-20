const mongoose = require ('mongoose');// Importa la libreria mongoose para interactuar con MongoDB

//Funcion para conectar a la base de datos MongoDB
const dbConnection = async () => {
    try {
        //Intenta conectar con la base de datos utilizando la url proporcionada en la variable de entorno MONGODB_CNN

        mongoose.connect(process.env.MONGODB.CNN);
        console.log('Datos en Linea')//Muestra un mensaje en consola indicado que la conexion se ha establecido correctamente
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}

//exporta la funcion de conexion a la base de datos para que pueda ser utilizada en otros modulos
module.exports = {
    dbConnection
}