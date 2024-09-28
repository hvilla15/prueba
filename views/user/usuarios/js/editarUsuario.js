const url = 'http://localhost:3000/usuarios'

const obtenerUsuario = async id =>{
    try{
        const resultado = await fetch(`${url}/${id}`)
        const usuario = await resultado.json()
        return usuario
    }catch(error){
        console.log(error)
    }
}

const editarUsuario = async usuario =>{
    try{
        await fetch(`${url}/${usuario.id}`,{
            method:'PUT',
            body:JSON.stringify(usuario),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }catch(error){
        console.log(error)
    }
}

const obtenerUsuarios = async ()=>{
    try{
        const resultado = await fetch(url)
        const usuarios = await resultado.json()
        return usuarios
    }catch(error){
        console.log(error)
    }
}

const pnombreInput = document.querySelector('#pnombre-input')
const snombreInput = document.querySelector('#snombre-input')
const papellidoInput = document.querySelector('#papellido-input')
const sapellidoInput = document.querySelector('#sapellido-input')
const cedulaInput = document.querySelector('#cedula-input')
const fnacimientoInput = document.querySelector('#fnacimiento-input')
const telefonoInput = document.querySelector('#telefono-input')
const emailInput = document.querySelector('#email-input')
const tipoInput = document.querySelector('#tipo-input')
const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el vehiculo exista
    const parametroURL = new URLSearchParams(window.location.search)
    //console.log(window.location.search)
    const idUsuario = parametroURL.get('id')
    //console.log(idUsuario)
    const usuario = await obtenerUsuario(idUsuario)
    //console.log(usuario)
    mostrarUsuario(usuario)

    //registro de la actualizacion del producto
    formulario.addEventListener('submit',validarUsuario)
})

function mostrarUsuario(usuario){
    const {pnombre,snombre,papellido,sapellido,cedula,fnacimiento,telefono,email,licencia,tipo,id} = usuario

    pnombreInput.value = pnombre
    snombreInput.value = snombre
    papellidoInput.value = papellido
    sapellidoInput.value = sapellido
    cedulaInput.value = cedula
    fnacimientoInput.value = fnacimiento
    telefonoInput.value = telefono
    emailInput.value = email
    tipoInput.value = tipo
    idInput.value = id
}

async function validarUsuario(e){
    e.preventDefault()
    const usuario = {
        pnombre:pnombreInput.value,
        snombre:snombreInput.value,
        papellido:papellidoInput.value,
        sapellido:sapellidoInput.value,
        cedula:cedulaInput.value,
        fnacimiento:fnacimientoInput.value,
        telefono:telefonoInput.value,
        email:emailInput.value,
        tipo:tipoInput.value,
        id:idInput.value
    }

    const usuarios = await obtenerUsuarios()

    const cedulaExistente = usuarios.some(u => u.cedula.toLowerCase() === cedulaInput.value.toLowerCase() && u.id.toLowerCase() !== idInput.value.toLowerCase())
    const telefonoExistente = usuarios.some(u => u.telefono.toLowerCase() === telefonoInput.value.toLowerCase() && u.id.toLowerCase() !== idInput.value.toLowerCase())
    const correoExistente = usuarios.some(u => u.email.toLowerCase() === emailInput.value.toLowerCase() && u.id.toLowerCase() !== idInput.value.toLowerCase())


    if(cedulaExistente){
        mostrarAlerta('Cedula ya registrada')
        return
    }else if(telefonoExistente){
        mostrarAlerta('Telefono ya registrado')
        return
    }else if(correoExistente){
        mostrarAlerta('Correo ya registrado')
        return
    }if(validar(usuario)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await editarUsuario(usuario)
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