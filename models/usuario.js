const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userRouter = require('../controllers/usuarios')

const userSchema = new mongoose.Schema({
    pnombre: { type: String, required: [true, 'El primer nombre es obligatorio'] },
    snombre: { type: String, required: [true, 'El segundo nombre es obligatorio'] },
    papellido: { type: String, required: [true, 'El primer apellido es obligatorio'] },
    sapellido: { type: String, required: [true, 'El segundo apellido es obligatorio'] },
    cedula: { type: String, required: [true, 'La cedula es obligatoria'] },
    fnacimiento: { type: String, required: [true, 'La fecha de nacimiento es obligatoria'] },
    telefono: { type: String, required: [true, 'El telefono es obligatorio'] },
    email: { type: String, required: [true, 'El correo electronico es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    tipo: { type: String, required: [true, 'El tipo de usuario es obligatorio'] }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.set('toJSON',{
    transform: (document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user