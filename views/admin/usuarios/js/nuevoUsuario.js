const nuevoUsuario = async usuario=>{
    try{
        const response = await axios.post('/api/usuarios',usuario)
        console.log(response)
    }catch(error){
        console.log(error)
    }
}

const obtenerUsuarios = async ()=>{
    try{
        const response = await axios.get('/api/usuarios')
        const usuarios = response.data
        return usuarios
    }catch(error){
        console.log(error)
    }
}

const formulario = document.querySelector('#formulario')
formulario.addEventListener('submit',validarUsuario)

async function validarUsuario(e){
    e.preventDefault()

    const pnombre = document.querySelector('#pnombre-input').value
    const snombre = document.querySelector('#snombre-input').value
    const papellido = document.querySelector('#papellido-input').value
    const sapellido = document.querySelector('#sapellido-input').value
    const cedula = document.querySelector('#cedula-input').value
    const fnacimiento = document.querySelector('#fnacimiento-input').value
    const telefono = document.querySelector('#telefono-input').value
    const email = document.querySelector('#email-input').value
    const tipo = document.querySelector('#tipo-input').value
    const password = generatePassword()

    const usuario = {
        pnombre,
        snombre,
        papellido,
        sapellido,
        cedula,
        fnacimiento,
        telefono,
        email,
        tipo,
        password
    }

    const usuarios = await obtenerUsuarios()

    const cedulaExistente = usuarios.some(u => u.cedula.toLowerCase() === cedula.toLowerCase())
    const telefonoExistente = usuarios.some(u => u.telefono.toLowerCase() === telefono.toLowerCase())
    const correoExistente = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())

    if (cedulaExistente) {
        mostrarAlerta('Usuario ya existe: cedula registrada')
        return
    }else if (telefonoExistente) {
        mostrarAlerta('Telefono ya registrado')
        return
    }else if (correoExistente) {
        mostrarAlerta('Correo ya registrado')
        return
    }else if(validar(usuario)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await nuevoUsuario(usuario)
        mostrarConfirmacion('Registro exitoso')
        window.location.href= '/usuarios'
    }
}

function generatePassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
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