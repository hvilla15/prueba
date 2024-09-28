const urlVehiculos = 'http://localhost:3000/vehiculos'
const urlMantenimiento = 'http://localhost:3000/mantenimiento'

const obtenerVehiculo = async id =>{
    try{
        const resultado = await fetch(`${urlVehiculos}/${id}`)
        const vehiculo = await resultado.json()
        return vehiculo
    }catch(error){
        console.log(error)
    }
}

const nuevoMantenimiento = async mantenimiento=>{
    try{
        await fetch(urlMantenimiento,{
            method:'POST',
            body: JSON.stringify(mantenimiento),
            header:{
                'Content-Type':'application/json'
            }
        })
    }catch(error){
        console.log(error)
    }
}

const editarVehiculo = async vehiculo =>{
    try{
        await fetch(`${urlVehiculos}/${vehiculo.id}`,{
            method:'PUT',
            body:JSON.stringify(vehiculo),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }catch(error){
        console.log(error)
    }
}

const marcaInput = document.querySelector('#marca-input')
const modeloInput = document.querySelector('#modelo-input')
const añoInput = document.querySelector('#año-input')
const placaInput = document.querySelector('#placa-input')
const tipoInput = document.querySelector('#tipo-input')
const kmInput = document.querySelector('#km-input')
const combustibleInput = document.querySelector('#combustible-input')
const estadoInput = document.querySelector('#estado-input')
const ubicacionInput = document.querySelector('#ubicacion-input')
const idVehiculoInput = document.querySelector('#idVehiculo-input')
const fechaProgramadaInput = document.querySelector('#fechaProgramada-input')
const fechaCierreInput = document.querySelector('#fechaCierre-input')
const mantenimientoInput = document.querySelector('#mantenimiento-input')
const detallesInput = document.querySelector('#detalles-input')
const resultadoInput = document.querySelector('#resultado-input')
const detallesCierreInput = document.querySelector('#detallesCierre-Input')
const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')
const hoy = new Date().toISOString().split('T')[0]
fechaProgramadaInput.min = hoy

//validacion de input deshabilitados
function asegurarDisabled() {
    if (!marcaInput.disabled || !modeloInput.disabled || !añoInput.disabled || !placaInput.disabled) {
        marcaInput.disabled = true
        modeloInput.disabled = true
        añoInput.disabled = true
        placaInput.disabled = true
    }
}
setInterval(asegurarDisabled, 1000)

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el vehiculo exista
    const parametroURL = new URLSearchParams(window.location.search)
    //console.log(window.location.search)
    const idVehiculo = parametroURL.get('id')
    //console.log(idVehiculo)
    const vehiculo = await obtenerVehiculo(idVehiculo)
    //console.log(vehiculo)
    mostrarVehiculo(vehiculo)

    //registro de la actualizacion del producto
    formulario.addEventListener('submit',validarMantenimiento)
    formulario.addEventListener('submit',validarVehiculo)
})

function mostrarVehiculo(vehiculo){
    const {marca,modelo,año,placa,tipo,km,combustible,estado,ubicacion,id} = vehiculo

    marcaInput.value = marca
    modeloInput.value = modelo
    añoInput.value = año
    placaInput.value = placa
    tipoInput.value = tipo
    kmInput.value = km
    combustibleInput.value = combustible
    estadoInput.value = estado
    ubicacionInput.value = ubicacion
    idVehiculoInput.value = id
}

async function validarMantenimiento(e){
    e.preventDefault()
    const userLS = localStorage.getItem('userSession')
    const user = JSON.parse(userLS)
    const pnombre = user[1]
    const papellido = user[3]

    const mantenimiento = {
        marca:marcaInput.value,
        modelo:modeloInput.value,
        año:añoInput.value,
        placa:placaInput.value,
        fechaProgramada:fechaProgramadaInput.value,
        fechaCierre:fechaCierreInput.value,
        resultado:resultadoInput.value,
        mantenimiento:mantenimientoInput.value,
        detalles:detallesInput.value,
        usuario:pnombre+' '+papellido,
        idVehiculo: new URLSearchParams(window.location.search).get('id')
    }

    if(validar(mantenimiento)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await nuevoMantenimiento(mantenimiento)
        mostrarConfirmacion('Mantenimiento programado exitosamente')
        window.location.href= 'index.html'
    }
}

async function validarVehiculo(e){
    e.preventDefault()
    const vehiculo = {
        marca:marcaInput.value,
        modelo:modeloInput.value,
        año:añoInput.value,
        placa:placaInput.value,
        tipo:tipoInput.value,
        km:kmInput.value,
        combustible:combustibleInput.value,
        estado:'En mantenimiento',
        ubicacion:obtenerUbicacion('En mantenimiento'),
        id:idVehiculoInput.value
    }

    function obtenerUbicacion(estado) {
        let ubicacion
        switch (estado) {
            case 'En mantenimiento':
                ubicacion = 'Taller'
                break
            default:
                ubicacion = null
        }
        return ubicacion
    }

    if(validar(vehiculo)){
        return
    }else{
        await editarVehiculo(vehiculo)
    }
}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='')
}

function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.bg-red-100')
    
    if(!alerta){
        const alert = document.createElement('p')
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','text-center')
        alert.innerHTML = mensaje
        formulario.appendChild(alert)

        setTimeout(()=>{
            alert.remove()
        },3000)
    }
}

function mostrarConfirmacion(mensaje){
    const confirmacion = document.querySelector('.bg-green-100')
    
    if(!confirmacion){
        const confirmar = document.createElement('p')
        confirmar.classList.add('bg-green-100','border-green-400','text-green-700','px-4','py-3','rounded','text-center')
        confirmar.innerHTML = mensaje
        formulario.appendChild(confirmar)

        setTimeout(()=>{
            alert.remove()
        },3000)
    }
}