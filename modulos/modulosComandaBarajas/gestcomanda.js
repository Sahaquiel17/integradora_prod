let productosEnComanda = [];
let comandas = [];
let comandaSeleccionada = null;
let productoSeleccionado = null;
const dataPath = "modulos/modulosComandaBarajas/";

// Cargar comandas desde el archivo JSON
fetch(dataPath + "comandas.json")
    .then(response => response.json())
    .then(jsondata => {
        comandas = jsondata.comandas;
        actualizarTablaComandas();
    });

// Función para actualizar la tabla de productos en la comanda
function actualizarTablaProductos() {
    let cuerpo = "";
    productosEnComanda.forEach((producto, index) => {
        if (!producto.precioProducto) {
            producto.precioProducto = 0; // Establecer un valor por defecto si es indefinido
        }
        let total = producto.cantidad * producto.precioProducto;
        cuerpo += `<tr data-index="${index}">
                    <td>${producto.idProducto}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${producto.precioProducto.toFixed(2)}</td>
                    <td>$${total.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-success btnSeleccionarProducto">Seleccionar</button>
                    </td>
                </tr>`;
    });
    document.getElementById("tblProductosTemp").innerHTML = cuerpo;

    // Añadir event listeners para los botones de selección de productos
    document.querySelectorAll(".btnSeleccionarProducto").forEach((btn) => {
        btn.addEventListener("click", () => {
            const row = btn.closest("tr");
            const index = row.getAttribute("data-index");
            seleccionarProducto(index);
        });
    });
}

// Función para actualizar la tabla de comandas
function actualizarTablaComandas() {
    let cuerpo = "";
    comandas.forEach((comanda, index) => {
        let productos = comanda.productos.map(p => {
            if (p.precioProducto === undefined || p.precioProducto === null) {
                p.precioProducto = 0; // Establecer un valor por defecto si es indefinido o nulo
            }
            return `ID: ${p.idProducto} - Cantidad: ${p.cantidad} - Precio: $${p.precioProducto.toFixed(2)}`;
        }).join("<br>");
        cuerpo += `<tr data-index="${index}">
                    <td>${comanda.idComanda}</td>
                    <td>${productos}</td>
                    <td>$${comanda.totalComanda.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-success btnSeleccionarComanda">Seleccionar</button>
                    </td>
                </tr>`;
    });
    document.getElementById("tblComandas").querySelector("tbody").innerHTML = cuerpo;

    // Añadir event listeners para los botones de selección de comandas
    document.querySelectorAll(".btnSeleccionarComanda").forEach((btn) => {
        btn.addEventListener("click", () => {
            const row = btn.closest("tr");
            const index = row.getAttribute("data-index");
            seleccionarComanda(index);
        });
    });
}

function seleccionarComanda(index) {
    comandaSeleccionada = index;
    const comanda = comandas[index];
    
    // Rellenar los campos del formulario con la información de la comanda seleccionada
    document.getElementById("txtIdComanda").value = comanda.idComanda;

    productosEnComanda = comanda.productos.slice();
    actualizarTablaProductos();

    document.getElementById("btnModificarComanda").disabled = false;
    document.getElementById("btnEliminarComanda").disabled = false;
    document.getElementById("btnLimpiarComanda").disabled = false;
}

// Función para seleccionar un producto
function seleccionarProducto(index) {
    productoSeleccionado = parseInt(index); // Asegurarse de que sea un número entero
    const producto = productosEnComanda[productoSeleccionado];
    
    document.getElementById("txtIdProducto").value = producto.idProducto;
    document.getElementById("txtCantidad").value = producto.cantidad;
    document.getElementById("txtPrecioProducto").value = producto.precioProducto;

    document.getElementById("btnModificarProducto").disabled = false;
    document.getElementById("btnEliminarProducto").disabled = false;
    document.getElementById("btnLimpiarProducto").disabled = false;
}

// Agregar un producto a la comanda
document.getElementById("btnAgregarProducto").addEventListener("click", () => {
    const idProducto = document.getElementById("txtIdProducto").value;
    const cantidad = parseInt(document.getElementById("txtCantidad").value);
    const precioProducto = parseFloat(document.getElementById("txtPrecioProducto").value);
    
    if (idProducto && cantidad > 0 && precioProducto > 0) {
        productosEnComanda.push({ idProducto, cantidad, precioProducto });
        actualizarTablaProductos();
        limpiarFormularioProducto();
    } else {
        alert("Por favor, completa todos los campos correctamente.");
    }
});

// Modificar un producto en la comanda
document.getElementById("btnModificarProducto").addEventListener("click", () => {
    if (productoSeleccionado !== null && !isNaN(productoSeleccionado)) {
        const idProducto = document.getElementById("txtIdProducto").value;
        const cantidad = parseInt(document.getElementById("txtCantidad").value);
        const precioProducto = parseFloat(document.getElementById("txtPrecioProducto").value);
        
        if (idProducto && cantidad > 0 && precioProducto > 0) {
            productosEnComanda[productoSeleccionado] = { idProducto, cantidad, precioProducto };
            actualizarTablaProductos();
            limpiarFormularioProducto();
        } else {
            alert("Por favor, completa todos los campos correctamente.");
        }
    } else {
        alert("Selecciona un producto para modificar.");
    }
});

// Eliminar un producto de la comanda
document.getElementById("btnEliminarProducto").addEventListener("click", () => {
    if (productoSeleccionado !== null && !isNaN(productoSeleccionado)) {
        productosEnComanda.splice(productoSeleccionado, 1);
        actualizarTablaProductos();
        limpiarFormularioProducto();
    } else {
        alert("Selecciona un producto para eliminar.");
    }
});

// Limpiar el formulario de producto
document.getElementById("btnLimpiarProducto").addEventListener("click", () => {
    limpiarFormularioProducto();
});

function limpiarFormularioProducto() {
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtCantidad").value = "";
    document.getElementById("txtPrecioProducto").value = "";
    document.getElementById("btnModificarProducto").disabled = true;
    document.getElementById("btnEliminarProducto").disabled = true;
    document.getElementById("btnLimpiarProducto").disabled = true;
    productoSeleccionado = null;
}

// Agregar una comanda
document.getElementById("btnAgregarComanda").addEventListener("click", () => {
    const idComanda = document.getElementById("txtIdComanda").value;

    if (idComanda && productosEnComanda.length > 0) {
        const totalComanda = productosEnComanda.reduce((total, producto) => 
            total + (producto.cantidad * producto.precioProducto), 0
        );

        comandas.push({
            idComanda,
            productos: productosEnComanda,
            totalComanda
        });

        // Limpiar la tabla de productos
        productosEnComanda = [];
        actualizarTablaProductos();
        actualizarTablaComandas();
        limpiarFormularioComanda();
    } else {
        alert("Por favor, completa todos los campos y asegúrate de agregar al menos un producto.");
    }
});

// Modificar una comanda
document.getElementById("btnModificarComanda").addEventListener("click", () => {
    if (comandaSeleccionada !== null) {
        const idComanda = document.getElementById("txtIdComanda").value;

        if (idComanda && productosEnComanda.length > 0) {
            const totalComanda = productosEnComanda.reduce((total, producto) => 
                total + (producto.cantidad * producto.precioProducto), 0
            );

            comandas[comandaSeleccionada] = {
                idComanda,
                productos: productosEnComanda,
                totalComanda
            };

            // Limpiar la tabla de productos
            productosEnComanda = [];
            actualizarTablaProductos();
            actualizarTablaComandas();
            limpiarFormularioComanda();
        } else {
            alert("Por favor, completa todos los campos y asegúrate de agregar al menos un producto.");
        }
    } else {
        alert("Selecciona una comanda para modificar.");
    }
});

// Eliminar una comanda
document.getElementById("btnEliminarComanda").addEventListener("click", () => {
    if (comandaSeleccionada !== null) {
        comandas.splice(comandaSeleccionada, 1);
        // Limpiar la tabla de productos
        productosEnComanda = [];
        actualizarTablaProductos();
        actualizarTablaComandas();
        limpiarFormularioComanda();
    } else {
        alert("Selecciona una comanda para eliminar.");
    }
});

// Limpiar el formulario de comanda
document.getElementById("btnLimpiarComanda").addEventListener("click", () => {
    limpiarFormularioComanda();
});

function limpiarFormularioComanda() {
    document.getElementById("txtIdComanda").value = "";
    document.getElementById("btnModificarComanda").disabled = true;
    document.getElementById("btnEliminarComanda").disabled = true;
    document.getElementById("btnLimpiarComanda").disabled = true;
    comandaSeleccionada = null;
}


// Función de búsqueda de comandas
function buscarComanda() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputBusqueda");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblComandas");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

document.getElementById("inputBusqueda").addEventListener("keyup", buscarComanda);
