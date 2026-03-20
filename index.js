const express = require('express'); // Importamos el framework Express
const bodyParser = require('body-parser'); // Importamos body-parser para analizar el cuerpo de las solicitudes
const axios = require('axios'); // Importamos axios para realizar solicitudes HTTP

const app = express(); // Creamos una instancia de la aplicación Express

// Configurar body-parser para analizar datos de formularios con URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir el formulario HTML al acceder a la raíz '/'
app.get('/', (req, res) => {
    // Enviamos el archivo HTML 'index.html' como respuesta
    res.sendFile(__dirname + '/views/index.html');
});

// Ruta para manejar el envío del formulario mediante POST a '/submit'
app.post('/submit', async (req, res) => {
    // Extraemos los datos enviados desde el formulario
    const { nombre, email, password, rol } = req.body;

    try {
        // Realizamos una solicitud POST a la API para crear un nuevo usuario con los datos del formulario
        const response = await axios.post('https://apinodemongo-hup.onrender.com/api/usuarios', {
            nombre,
            email,
            password,
            rol
        });

        // Si la solicitud es exitosa, enviamos una respuesta con los datos del usuario creado
        res.send(`Usuario creado con éxito: ${JSON.stringify(response.data)}`);
    } catch (error) {
        // Si ocurre un error, enviamos el mensaje de error como respuesta
        res.send(`Error al crear usuario: ${JSON.stringify(error.response.data)}`);
    }
});

// Iniciar el servidor en el puerto definido por la variable de entorno o el puerto 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});