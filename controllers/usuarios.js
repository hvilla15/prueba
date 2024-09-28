const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const user = require('../models/usuario')

//create
userRouter.post('/', async (request, response) => {
    const { pnombre, snombre, papellido, sapellido, cedula, fnacimiento, telefono, email, password, tipo } = request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const nuevoUsuario = new user({ pnombre, snombre, papellido, sapellido, cedula, fnacimiento, telefono, email, password: hashedPassword, tipo })
    try {
        await nuevoUsuario.save()

        // Configurar el transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        // Configurar el correo electrónico
        const mailOptions = {
            from: '',
            to: email,
            subject: 'Credenciales de acceso',
            text: `¡Bienvenid@ ${pnombre} ${papellido}!\n\nTu cuenta ha sido creada exitosamente. A continuacion, tus credenciales de acceso:\n\nEmail: ${email}\nPassword: ${password}\n\n`
        }

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions)
        response.status(200).json(nuevoUsuario)
    } catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            response.status(400).json({ message: 'Error de validación', errors: error.errors })
        } else {
            response.status(400).json({ message: 'Error al registrar al usuario' })
        }
    }
})

/*userRouter.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        const user2 = await user.findOne({ email });

        if (!user2) {
            return response.status(400).json({ message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password.toString(), user2.password);
        if (!isMatch) {
            console.log(password)
            return response.status(400).json({ message: 'Contraseña incorrecta' });
        }

        response.status(200).json(user2);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }
})*/

//read
userRouter.get('/', async (request, response)=>{
    try{
        const usuarios = await user.find()
        return response.status(200).json(usuarios)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener los usuarios'})
    }
})

userRouter.get('/:id', async (request, response) => {
    try{
        const userId = await user.findById(request.params.id)
        response.status(200).json(userId)
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al obtener el usuario' })
    }
})

//update
userRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const datosActualizados = request.body

    try {
        const usuarioActualizado = await user.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true })
        if (!usuarioActualizado) {
            return response.status(404).json({ message: 'Usuario no encontrado' })
        }
        response.status(200).json(usuarioActualizado)
    } catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al actualizar el usuario', error })
    }
})

//delete
userRouter.delete('/:id', async (request, response) => {
    try{
        const userId = await user.findByIdAndDelete(request.params.id);
        response.status(200).json({ message: 'Usuario eliminado exitosamente' })
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al eliminar el usuario' })
    }
})

module.exports = userRouter