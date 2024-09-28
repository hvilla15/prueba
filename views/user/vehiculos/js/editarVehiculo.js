const url = 'http://localhost:3000/vehiculos'

const obtenerVehiculo = async id =>{
    try{
        const resultado = await fetch(`${url}/${id}`)
        const vehiculo = await resultado.json()
        return vehiculo
    }catch(error){
        console.log(error)
    }
}

const editarVehiculo = async vehiculo =>{
    try{
        await fetch(`${url}/${vehiculo.id}`,{
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

const obtenerVehiculos = async ()=>{
    try{
        const resultado = await fetch(url)
        const vehiculos = await resultado.json()
        return vehiculos
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
const estadoInput = document.querySelector('#estado-input')
const ubicacionInput = document.querySelector('#ubicacion-input')
const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')

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
    formulario.addEventListener('submit',validarVehiculo)
})

function mostrarVehiculo(vehiculo){
    const {marca,modelo,año,placa,tipo,km,estado,ubicacion,id} = vehiculo

    marcaInput.value = marca
    modeloInput.value = modelo
    añoInput.value = año
    placaInput.value = placa
    tipoInput.value = tipo
    kmInput.value = km
    estadoInput.value = estado
    ubicacionInput.value = ubicacion
    idInput.value = id
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
        estado:estadoInput.value,
        ubicacion:ubicacionInput.value,
        id:idInput.value
    }

    const vehiculos = await obtenerVehiculos();

    const placaExistente = vehiculos.some(v => v.placa.toLowerCase() === placaInput.value.toLowerCase() && v.id.toLowerCase() !== idInput.value.toLowerCase())
    
    if (placaExistente) {
        mostrarAlerta('La placa ingresada ya esta registrada');
        return;
    }else if(validar(vehiculo)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await editarVehiculo(vehiculo)
        mostrarConfirmacion('Modificacion exitosa')
        window.location.href= 'index.html'
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