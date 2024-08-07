let obj = [];
let indexComboSeleccionado;
const imgPath = "img/"; // Ruta a la carpeta de imágenes
const dataPath = "modulos/modulosCombosBarajas/";

// Cargar los datos desde el archivo JSON
fetch(dataPath + "combos.json")
    .then(response => response.json())
    .then(jsondata => {
        obj = jsondata.combos;
        console.log("Datos cargados:", obj);
        actualizarTabla();
        cargarDescripciones(); // Cambiado a cargarDescripciones
    })
    .catch(error => console.error('Error al cargar los datos:', error));

// Cargar las descripciones dinámicamente
function cargarDescripciones() {
    const descripciones = ["Descripción 1", "Descripción 2", "Descripción 3"];
    descripciones.forEach((desc, index) => {
        const select = document.getElementById(`selectDescripcion${index + 1}`);
        obj.forEach(combo => {
            if (combo[`descripcion${index + 1}`]) {
                const option = document.createElement("option");
                option.value = combo[`descripcion${index + 1}`];
                option.text = combo[`descripcion${index + 1}`];
                select.appendChild(option);
            }
        });
    });
}

// Agregar un nuevo combo
function agregarCombo() {
    const nombre = document.getElementById("nombreCombo").value;
    const descripcion1 = document.getElementById("selectDescripcion1").value;
    const descripcion2 = document.getElementById("selectDescripcion2").value;
    const descripcion3 = document.getElementById("selectDescripcion3").value;
    const precio = document.getElementById("precioCombo").value;
    const estatus = document.getElementById("estatusCombo").value;
    const foto = document.getElementById("txtFoto").src;

    if (nombre === "" || descripcion1 === "" || descripcion2 === "" || descripcion3 === "" || precio === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    const combo = {
        nombre,
        descripcion1,
        descripcion2,
        descripcion3,
        precio: parseFloat(precio),
        estatus,
        foto
    };

    obj.push(combo);
    guardarDatos();
    actualizarTabla();
    limpiar();
}

// Guardar los datos en el archivo JSON (simulado)
function guardarDatos() {
    // Esta función simula la guardado en un archivo JSON
    console.log("Datos guardados:", JSON.stringify({ combos: obj }, null, 2));
}

// Actualizar la tabla de combos
function actualizarTabla() {
    const tabla = document.querySelector("#tblCombos tbody");
    tabla.innerHTML = "";

    obj.forEach((combo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${combo.nombre}</td>
            <td>${combo.descripcion1}, ${combo.descripcion2}, ${combo.descripcion3}</td>
            <td><img src="${combo.foto}" alt="${combo.nombre}" class="img-fluid" style="max-width: 100px;"></td>
            <td>$${combo.precio.toFixed(2)}</td>
            <td>${combo.estatus}</td>
        `;

        row.addEventListener("click", () => seleccionarCombo(index));

        tabla.appendChild(row);
    });
}

// Seleccionar un combo para modificar/eliminar
function seleccionarCombo(index) {
    indexComboSeleccionado = index;
    const combo = obj[index];

    document.getElementById("nombreCombo").value = combo.nombre;
    document.getElementById("selectDescripcion1").value = combo.descripcion1;
    document.getElementById("selectDescripcion2").value = combo.descripcion2;
    document.getElementById("selectDescripcion3").value = combo.descripcion3;
    document.getElementById("precioCombo").value = combo.precio;
    document.getElementById("estatusCombo").value = combo.estatus;
    document.getElementById("txtFoto").src = combo.foto;

    document.getElementById("btnAgregar").classList.add("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
}

// Modificar un combo existente
function modificaCombo() {
    if (indexComboSeleccionado === undefined) return;

    const nombre = document.getElementById("nombreCombo").value;
    const descripcion1 = document.getElementById("selectDescripcion1").value;
    const descripcion2 = document.getElementById("selectDescripcion2").value;
    const descripcion3 = document.getElementById("selectDescripcion3").value;
    const precio = document.getElementById("precioCombo").value;
    const estatus = document.getElementById("estatusCombo").value;
    const foto = document.getElementById("txtFoto").src;

    if (nombre === "" || descripcion1 === "" || descripcion2 === "" || descripcion3 === "" || precio === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    const combo = {
        nombre,
        descripcion1,
        descripcion2,
        descripcion3,
        precio: parseFloat(precio),
        estatus,
        foto
    };

    obj[indexComboSeleccionado] = combo;
    guardarDatos();
    actualizarTabla();
    limpiar();
}

// Eliminar un combo existente
function eliminarCombo() {
    if (indexComboSeleccionado === undefined) return;

    obj.splice(indexComboSeleccionado, 1);
    guardarDatos();
    actualizarTabla();
    limpiar();
}

// Limpiar el formulario
function limpiar() {
    document.getElementById("comboForm").reset();
    document.getElementById("txtFoto").src = "img/nada.jpg";
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
}

// Desplegar la foto seleccionada
function despliegaFoto() {
    const input = document.getElementById("txtFotoRuta");
    const img = document.getElementById("txtFoto");
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
}

// Función de búsqueda
function search() {
    const input = document.getElementById("inputBusqueda").value.toLowerCase();
    const filas = document.querySelectorAll("#tblCombos tbody tr");

    filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        fila.style.display = contenido.includes(input) ? "" : "none";
    });
}
