const formulario = document.querySelector('#formulario')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')

formulario.addEventListener('submit', async e=>{
    e.preventDefault();

    const response = await axios.get('/api/usuarios')
    const usuarios = await response.data

    const userSession = usuarios.find(userSession => userSession.email === emailInput.value)
    const password = usuarios.find(password => password.password === passwordInput.value)

    const user = [userSession.id,userSession.pnombre,userSession.snombre,userSession.papellido,userSession.sapellido,userSession.email]

    if(!userSession){
        //console.log('Usuario no existe')
        mostrarAlerta('Usuario invalido')
    }else if(!password){
        //console.log('Contraseña incorrecta')
        mostrarAlerta('Contraseña incorrecta')
    }else{
        if(userSession.tipo === 'Administrador'){
            localStorage.setItem('userSession',JSON.stringify(user))
            mostrarConfirmacion('Autenticacion exitosa')
            window.location.href = '/'
        }else if(userSession.tipo === 'Usuario'){
            mostrarConfirmacion('En construccion')
        }else if(userSession.tipo === 'Inactivo'){
            mostrarAlerta('Usuario inhabilitado, contacte al administrador del sistema')
        }
    }

    if(!userSession && !password){
        mostrarAlerta('Todos los campos son obligatorios')
    }
})

/*formulario.addEventListener('submit', async e => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await axios.post('/api/usuarios/login', { email, password });
        const userSession = response.data;

        const user = [userSession.id, userSession.pnombre, userSession.snombre, userSession.papellido, userSession.sapellido, userSession.email];

        if (userSession.tipo === 'Administrador') {
            localStorage.setItem('userSession', JSON.stringify(user));
            mostrarConfirmacion('Autenticación exitosa');
            window.location.href = '/';
        } else if (userSession.tipo === 'Usuario') {
            mostrarConfirmacion('En construcción');
        } else if (userSession.tipo === 'Inactivo') {
            mostrarAlerta('Usuario inhabilitado, contacte al administrador del sistema');
        }
    } catch (error) {
        mostrarAlerta(error.response.data.message || 'Error al iniciar sesión');
    }
});*/

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