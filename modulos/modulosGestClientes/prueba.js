
/*
const formularioC = document.querySelector('#formularioC');

const procesar = (event) => {
event.preventDefault();
const datos = new FormData(event.target);

const datosComp = Object.fromEntries(datos.entries());
console.log(JSON.stringify(datosComp));
}

formularioC.addEventListener( 'submit' , procesar);
*/

const btn = document.querySelector('#btn');
const formulario = document.querySelector('#formularioC');

/* Funcion para sacar los datos del Formulario con FormData (con leccion anterior) */

const getData = () => {
    const datos = new FormData(formulario);
    const datosProcesados = Object.fromEntries(datos.entries());
    formulario.reset();
    return datosProcesados;
}

/*Funcion para colocar los datos en el Servidor */

const postData = async () => {

    /*Crea un objeto con la informacion del formulario*/
    const newUser = getData();

    try {
        const response = await fetch('clientes', {
            /*especifica el metodo que se va a usar*/
            method: 'POST',
            /*especifica el tipo de informacion (JSON)*/
            headers: { 'Content-Type': 'application/json' },
            /*coloca la informacion en el formato JSON */
            body: JSON.stringify(newUser)
        });


        if (response.ok) {
            const jsonResponse = await response.json();

            /* Codigo con la respuesta*/

            const { nombre,
                app,
                apm,
                tel,
                correo,
                num,
                estado,
                ciudad,
                colonia,
                calle,
                CP,
                numExt,
                numInt } = jsonResponse;

                alert(
                    `¡Éxito! Se guardó la siguiente información:
                    Nombre: ${nombre}
                    Apellido Paterno: ${app}
                    Apellido Materno: ${apm}
                    Teléfono: ${tel}
                    Correo :${correo}
                    numero tarjeta:${num}
                    Estado: ${estado}
                    Ciudad: ${ciudad}
                    Colonia: ${colonia}
                    Calle: ${calle}
                    Código Postal: ${CP}
                    Número Exterior: ${numExt}
                    Número Interior: ${numInt}`
                );
        }

    } catch (error) {
        console.log(error);
    }

}


btn.addEventListener('click', (event) => {
    event.preventDefault();
    postData();

})
