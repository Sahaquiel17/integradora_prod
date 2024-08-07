let obj = [];
let indexEmpleadoSeleccionado;
const dataPath = "http://localhost:8080/Proyecto1/modulos/modulosEmpleados/";
const imgPath = "http://localhost:8080/Proyecto1/modulos/modulosEmpleados/imagenes/"; // Define imgPath aquí

// Cargar los datos desde el archivo JSON
fetch(dataPath + "empleadosjson.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar los datos: ' + response.statusText);
        }
        return response.json();
    })
    .then(jsondata => {
        obj = jsondata.empleado;
        console.log("Datos cargados:", obj);
        actualizarTabla();
        cargarSucursales(); // Carga las sucursales
    })
    .catch(error => console.error(error));

// Cargar las sucursales en el select
function cargarSucursales() {
    const select = document.getElementById("selectsucursal");
    if (!select) return;

    const sucursales = Array.from(new Set(obj.map(emp => emp.NomSucursal)));

    sucursales.forEach(sucursal => {
        const option = document.createElement("option");
        option.value = sucursal;
        option.text = sucursal;
        select.appendChild(option);
    });
}

// Agregar un nuevo empleado
function agregarEmpleado() {
    const nombre = document.getElementById("txtnomProd").value;
    const App = document.getElementById("txtApp").value;
    const Apm = document.getElementById("txtApm").value;
    const Tel = document.getElementById("txttel").value;
    const Calle = document.getElementById("txtcalle").value;
    const NumEx = document.getElementById("txtnex").value;
    const NumInt = document.getElementById("txtnin").value;
    const Colonia = document.getElementById("txtcolonia").value;
    const Cuidad = document.getElementById("txtcuidad").value;
    const Estado = document.getElementById("txtestado").value;
    const CP = document.getElementById("txtcp").value;
    const NomSucursal = document.getElementById("selectsucursal").value;
    const IdP = document.getElementById("txtidp").value;
    const foto = document.getElementById("txtFoto").src;

    if (nombre === "" || NomSucursal === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    const empleado = {
        nombre,
        App,
        Apm,
        Tel,
        Calle,
        NumEx,
        NumInt,
        Colonia,
        Cuidad,
        Estado,
        CP,
        NomSucursal,
        foto,
        IdP
    };

    obj.push(empleado);
    guardarDatos();
    actualizarTabla();
    limpiar();
}

// Guardar los datos (simulado)
function guardarDatos() {
    // Esta función simula la guardado en un archivo JSON
    console.log("Datos guardados:", JSON.stringify({ empleado: obj }, null, 2));
}

// Actualizar la tabla de empleados
function actualizarTabla() {
    const tabla = document.querySelector("#tblProductos tbody");
    if (!tabla) return;

    tabla.innerHTML = "";

    obj.forEach((empleado, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.App}</td>
            <td>${empleado.Apm}</td>
            <td>${empleado.Tel}</td>
            <td>${empleado.Calle}</td>
            <td>${empleado.NumEx}</td>
            <td>${empleado.NumInt}</td>
            <td>${empleado.Colonia}</td>
            <td>${empleado.Cuidad}</td>
            <td>${empleado.Estado}</td>
            <td>${empleado.CP}</td>
            <td>${empleado.NomSucursal}</td>
            <td><img src="${empleado.foto || imgPath + 'nada.jpg'}" alt="${empleado.nombre}" class="img-fluid" style="max-width: 100px;"></td>
            <td>${empleado.IdP}</td>
        `;

        row.addEventListener("click", () => seleccionarEmpleado(index));

        tabla.appendChild(row);
    });
}

// Seleccionar un empleado para modificar/eliminar
function seleccionarEmpleado(index) {
    indexEmpleadoSeleccionado = index;
    const empleado = obj[index];
    document.getElementById("txtnomProd").value = empleado.nombre;
    document.getElementById("txtApp").value = empleado.App;
    document.getElementById("txtApm").value = empleado.Apm;
    document.getElementById("txttel").value = empleado.Tel;
    document.getElementById("txtcalle").value = empleado.Calle;
    document.getElementById("txtnex").value = empleado.NumEx;
    document.getElementById("txtnin").value = empleado.NumInt;
    document.getElementById("txtcolonia").value = empleado.Colonia;
    document.getElementById("txtcuidad").value = empleado.Cuidad;
    document.getElementById("txtestado").value = empleado.Estado;
    document.getElementById("txtcp").value = empleado.CP;
    document.getElementById("selectsucursal").value = empleado.NomSucursal;
    document.getElementById("txtidp").value = empleado.IdP;
    document.getElementById("txtFoto").src = empleado.foto || imgPath + 'nada.jpg';

    document.getElementById("btnAgregar").classList.add("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
}

// Modificar un empleado existente
function modificaEmpleado() {
    if (indexEmpleadoSeleccionado === undefined) return;

    const nombre = document.getElementById("txtnomProd").value;
    const App = document.getElementById("txtApp").value;
    const Apm = document.getElementById("txtApm").value;
    const Tel = document.getElementById("txttel").value;
    const Calle = document.getElementById("txtcalle").value;
    const NumEx = document.getElementById("txtnex").value;
    const NumInt = document.getElementById("txtnin").value;
    const Colonia = document.getElementById("txtcolonia").value;
    const Cuidad = document.getElementById("txtcuidad").value;
    const Estado = document.getElementById("txtestado").value;
    const CP = document.getElementById("txtcp").value;
    const NomSucursal = document.getElementById("selectsucursal").value;
    const IdP = document.getElementById("txtidp").value;
    const foto = document.getElementById("txtFoto").src;

    if (nombre === "" || NomSucursal === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    const empleado = {
        nombre,
        App,
        Apm,
        Tel,
        Calle,
        NumEx,
        NumInt,
        Colonia,
        Cuidad,
        Estado,
        CP,
        NomSucursal,
        foto,
        IdP
    };

    obj[indexEmpleadoSeleccionado] = empleado;
    guardarDatos();
    actualizarTabla();
    limpiar();
}

// Eliminar un empleado existente
function eliminarEmpleado() {
    if (indexEmpleadoSeleccionado === undefined) return;

    obj.splice(indexEmpleadoSeleccionado, 1);
    guardarDatos();
    actualizarTabla();
    limpiar();
}

// Limpiar el formulario
function limpiar() {
    document.getElementById("comboForm").reset();
    document.getElementById("txtFoto").src = imgPath + "nada.jpg";
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
}

// Desplegar la foto seleccionada
function despliegaFoto() {
    const input = document.getElementById("txtFotoRuta");
    const img = document.getElementById("txtFoto");
    
    if (!input.files[0]) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
}

// Función de búsqueda
function search() {
    const input = document.getElementById("inputBusqueda").value.toLowerCase();
    const filas = document.querySelectorAll("#tblProductos tbody tr");

    filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        fila.style.display = contenido.includes(input) ? "" : "none";
    });
}
