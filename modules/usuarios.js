const {Schema, model} = require('mongoose');
//model de moongose para definir esquemas y modelos de datos 

//define el esuqema del modelo usuario

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']//Campo obligatorio con mensaje de error personalizado 
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],//Campo obligatorio con mensaje de error personalizado 
        unique: true//Campo unico para evitar duplicados en la base de datos
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],//Campo obligatorio con mensaje de error personalizado 
        minlength:3,//Longitud minima de 6 caracteres con mensaje de error personalizado
        maxlength:[60, 'La contraseña debe tener como máximo 60 caracteres']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],//Campo obligatorio con mensaje de error personalizado
        enum:['ADMIN_ROLE', 'USER_ROLE']//Valores permitidos para el campo rol
    },
    estado: {
        type: Boolean,
        default: true,//Valor por defecto para el campo estado 
        required: [true, 'El estado es obligatorio']//Campo obligatorio con mensaje de error personalizado
    }
})

module.exports = model('Usuario', UsuarioSchema);//Exporta el modelo de usuario para que pueda ser utilizado en otros modulos