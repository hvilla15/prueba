const nuevoVehiculo = async vehiculo=>{
    try{
        const response = await axios.post('/api/vehiculos',vehiculo)
        console.log(response)
    }catch(error){
        console.log(error)
    }
}

const obtenerVehiculos = async ()=>{
    try{
        const response = await axios.get('/api/vehiculos')
        const vehiculos = await response.data
        return vehiculos
    }catch(error){
        console.log(error)
    }
}

const formulario = document.querySelector('#formulario')
formulario.addEventListener('submit',validarVehiculo)

async function validarVehiculo(e){
    e.preventDefault()

    const marca = document.querySelector('#marca-input').value
    const modelo = document.querySelector('#modelo-input').value
    const año = document.querySelector('#año-input').value
    const placa = document.querySelector('#placa-input').value
    const tipo = document.querySelector('#tipo-input').value
    const km = document.querySelector('#km-input').value
    const estado = document.querySelector('#estado-input').value
    const ubicacion = document.querySelector('#ubicacion-input').value

    const vehiculo = {
        marca,
        modelo,
        año,
        placa,
        tipo,
        km,
        estado,
        ubicacion
    }

    const vehiculos = await obtenerVehiculos()
    const placaExistente = vehiculos.some(v => v.placa.toLowerCase() === placa.toLowerCase())

    if (placaExistente) {
        mostrarAlerta('La placa ingresada ya esta registrada');
        return;
    }else if(validar(vehiculo)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await nuevoVehiculo(vehiculo)
        mostrarConfirmacion('Vehiculo registrado exitosamente')
        window.location.href= '/vehiculos/'
    }
}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='')
}

function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.bg-red-100')
    
    if(!alerta){
        const alert = document.createElement('p')
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded-lg','text-center')
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
        confirmar.classList.add('bg-green-100','border-green-400','text-green-700','px-4','py-3','rounded-lg','text-center')
        confirmar.innerHTML = mensaje
        formulario.appendChild(confirmar)

        setTimeout(()=>{
            alert.remove()
        },3000)
    }
}