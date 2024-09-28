require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const vehicleRouter = require('./controllers/vehiculos')
const userRouter = require('./controllers/usuarios')
const routeRouter = require('./controllers/rutas')
const maintenanceRouter = require('./controllers/mantenimientos')
//const cors = require('cors')
//const cookieParser = require('cookie-parser')
//const morgan = require('morgan')

//conexion BD
async function conectarBD() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Conectado a MongoDB");
    }catch(error){
        console.log("No se ha podido conectar a MongoBD");
    }    
}
conectarBD()

//rutas frontend
app.use('/',express.static(path.resolve('views','admin','home')))
app.use('/login',express.static(path.resolve('views','login')))
app.use('/img',express.static(path.resolve('views','admin','img')))
app.use('/vehiculos',express.static(path.resolve('views','admin','vehiculos')))
app.use('/usuarios',express.static(path.resolve('views','admin','usuarios')))
app.use('/rutas',express.static(path.resolve('views','admin','rutas')))
app.use('/mantenimiento',express.static(path.resolve('views','admin','mantenimiento')))
app.use('/components',express.static(path.resolve('views','admin','components')))
app.use('/password',express.static(path.resolve('views','password')))

//importante
app.use(express.json())
//app.use(cors())
//app.use(cookieParser())
//app.use(morgan('tiny'))

//rutas de backend
app.use('/api/vehiculos',vehicleRouter)
app.use('/api/usuarios',userRouter)
app.use('/api/rutas',routeRouter)
app.use('/api/mantenimiento',maintenanceRouter)

module.exports = app