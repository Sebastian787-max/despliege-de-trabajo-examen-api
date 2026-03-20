const {Router} = require('express');
const router = Router();

const { login } = require('../controllers/auth');
router.post('/login', login);

const Usuario = require('../modules/usuario');
const bcrypt = require('bcryptjs');

async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Correo no encontrado'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario inactivo'
            });
        }

        const valido = await comparePassword(password, usuario.password);

        if (!valido) {
            return res.status(400).json({
                msg: 'Password incorrecto'
            });
        }

        res.json({
            msg: 'Login correcto'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

module.exports = { login };
module.exports = router;