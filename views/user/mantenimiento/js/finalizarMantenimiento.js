const url = 'http://localhost:3000/mantenimiento'
const urlVehiculos = 'http://localhost:3000/vehiculos'

const obtenerRegistro = async id =>{
    try{
        const resultado = await fetch(`${url}/${id}`)
        const registro = await resultado.json()
        return registro
    }catch(error){
        console.log(error)
    }
}

const editarRegistro = async registro =>{
    try{
        await fetch(`${url}/${registro.id}`,{
            method:'PUT',
            body:JSON.stringify(registro),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }catch(error){
        console.log(error)
    }
}

const obtenerVehiculo = async id =>{
    try{
        const resultado = await fetch(`${urlVehiculos}/${id}`)
        const vehiculo = await resultado.json()
        return vehiculo
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

//selectores
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
const mantenimientoInput = document.querySelector('#mantenimiento-input')
const detallesInput = document.querySelector('#detalles-input')
const fechaCierreInput = document.querySelector('#fechaCierre-input')
const resultadoInput = document.querySelector('#resultado-input')
const detallesCierreInput = document.querySelector('#detallesCierre-input')
const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')

//validacion de fechas

const hoy = new Date().toISOString().split('T')[0]
fechaCierreInput.min = hoy

fechaCierreInput.addEventListener('change', () => {
    if (new Date(fechaCierreInput.value) < new Date(fechaProgramadaInput.value)) {
      alert('La fecha de cierre no puede ser anterior a la fecha de inicio.')
      fechaCierreInput.value = fechaProgramadaInput.value
    }
})

//validacion de input deshabilitados
function asegurarDisabled() {
    if (!marcaInput.disabled || !modeloInput.disabled || !añoInput.disabled || !placaInput.disabled || !fechaProgramadaInput.disabled || !mantenimientoInput.disabled || !detallesInput.disabled) {
        marcaInput.disabled = true
        modeloInput.disabled = true
        añoInput.disabled = true
        placaInput.disabled = true
        fechaProgramadaInput.disabled = true
        mantenimientoInput.disabled = true
        detallesInput.disabled = true
    }
}
setInterval(asegurarDisabled, 1000)

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el registro exista
    const parametroURL = new URLSearchParams(window.location.search)
    const idRegistro = parametroURL.get('id')
    const registro = await obtenerRegistro(idRegistro)

    const idVehiculo = registro.idVehiculo
    const vehiculo = await obtenerVehiculo(idVehiculo)

    mostrarRegistro(registro)
    mostrarVehiculo(vehiculo)

    //registro de la actualizacion del producto
    formulario.addEventListener('submit',validarRegistro)
    formulario.addEventListener('submit',validarVehiculo)
})

function mostrarRegistro(registro){
    const {marca,modelo,año,placa,fechaProgramada,mantenimiento,detalles,id} = registro

    marcaInput.value = marca
    modeloInput.value = modelo
    añoInput.value = año
    placaInput.value = placa
    fechaProgramadaInput.value = fechaProgramada
    mantenimientoInput.value = mantenimiento
    detallesInput.value = detalles
    idInput.value = id
}

async function validarRegistro(e){
    e.preventDefault()
    const userLS = localStorage.getItem('userSession')
    const user = JSON.parse(userLS)
    const pnombre = user[1]
    const papellido = user[3]

    const registro = {
        marca:marcaInput.value,
        modelo:modeloInput.value,
        año:añoInput.value,
        placa:placaInput.value,
        fechaProgramada:fechaProgramadaInput.value,
        mantenimiento:mantenimientoInput.value,
        detalles:detallesInput.value,
        fechaCierre:fechaCierreInput.value,
        resultado:resultadoInput.value,
        detallesCierre:detallesCierreInput.value,
        usuario:pnombre+' '+papellido,
        id:idInput.value
    }

    if(validar(registro)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await editarRegistro(registro)
        mostrarConfirmacion('Mantenimiento finalizado exitosamente')
        window.location.href= 'index.html'
    }
}

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
        estado:obtenerEstado(resultadoInput.value),
        ubicacion:'Patios',
        id:idVehiculoInput.value
    }

    function obtenerEstado(resultado){
        let estado
        switch (resultado) {
            case 'Exitoso':
                estado = 'Disponible';
                break;
            case 'No exitoso':
                estado = 'Fuera de servicio';
                break;
            default:
                estado = null;
        }
        return estado;
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