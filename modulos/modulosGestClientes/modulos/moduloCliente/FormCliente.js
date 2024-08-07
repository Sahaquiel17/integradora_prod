let obj = []; // Arreglo que se llenará de objetos JSON
let indexProductosSeleccionados; // Índice del arreglo
let path = "modulos/modulosGestClientes/";

// Cargar datos JSON al inicio
fetch(path + "dato.json")
        .then((response) => response.json())
        .then((jsondata) => {
            obj = jsondata;
            console.log(obj);
            actualizaTabla();
        })
        .catch((error) => {
            console.error('Error al cargar el JSON:', error);
        });

function validarCampos() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("txtNombre").value.trim();
    let app = document.getElementById("txtApp").value.trim();
    let apm = document.getElementById("txtApm").value.trim();
    let tel = document.getElementById("txtTel").value.trim();
    let correo = document.getElementById("txtcorreo").value.trim();
    let num = document.getElementById("txtnum").value.trim();
      let estado = document.getElementById("txtEstado").value.trim();
    let cuidad = document.getElementById("txtCiudad").value.trim();
    let colonia = document.getElementById("txtColonia").value.trim();
      let calle = document.getElementById("txtCalle").value.trim();
    let ext = document.getElementById("txtNExt").value.trim();
    let int = document.getElementById("txtNInt").value.trim();
    // Verificar si algún campo está vacío
    if (!nombre || !app || !apm || !tel || !correo || !num || !estado || !cuidad || !colonia || !calle || !ext || !int) {
        alert("Todos los campos son obligatorios. Por favor, completa todos los campos.");
        return false;
    }
    return true;
}
function actualizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<tr>' +
                '<tr onclick="selectProducto(' + obj.indexOf(elemento) + ');">' +
                '<td>' + obj.indexOf(elemento) + '</td>' +
                '<td>' + elemento.nombre + '</td>' +
                '<td>' + elemento.app + '</td>' +
                '<td>' + elemento.apm+ '</td>' +
                '<td>' + elemento.tel + '</td>' +
                '<td>' + elemento.correo + '</td>' +
                '<td>' + elemento.num + '</td>' +
                '<td>' + elemento.estado + '</td>' +
                '<td>' + elemento.ciudad + '</td>' +
                '<td>' + elemento.colonia + '</td>' +
                '<td>' + elemento.calle + '</td>' +
                '<td>' + elemento.CP + '</td>' +
                '<td>' + elemento.numExt + '</td>' +
                '<td>' + elemento.numInt + '</td>' +
                 '<td>' + elemento.Estatus + '</td>' +
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}

function selectProducto(index) {
    document.getElementById("txtNombre").value = obj[index].nombre;
    document.getElementById("txtApp").value = obj[index].app;
    document.getElementById("txtApm").value = obj[index].apm;
    document.getElementById("txtTel").value = obj[index].tel;
    document.getElementById("txtcorreo").value = obj[index].correo;
    document.getElementById("txtnum").value = obj[index].num;
    document.getElementById("txtEstado").value = obj[index].estado;
    document.getElementById("txtCiudad").value = obj[index].ciudad;
    document.getElementById("txtColonia").value = obj[index].colonia;
    document.getElementById("txtCalle").value = obj[index].calle;
    document.getElementById("txtCP").value = obj[index].CP;
    document.getElementById("txtNExt").value = obj[index].numExt;
    document.getElementById("txtNInt").value = obj[index].numInt;
    document.getElementById("txtEstatus").value = obj[index].Estatus;
    indexProductosSeleccionados = index;
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");

}

function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApp").value = "";
    document.getElementById("txtApm").value = "";
    document.getElementById("txtTel").value = "";
    document.getElementById("txtcorreo").value = "";
    document.getElementById("txtnum").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtCalle").value = "";
    document.getElementById("txtCP").value = "";
    document.getElementById("txtNExt").value = "";
    document.getElementById("txtNInt").value = "";
document.getElementById("txtEstatus").value = "";
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("btnLimpiar").classList.add("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    indexProductosSeleccionados = 0;
}


function agregarProducto() {
    if (!validarCampos()) return;
    let nombre,app,apm,tel,estado, ciudad, numExt, numInt, colonia, calle, CP, correo, num;
    nombre = document.getElementById("txtNombre").value;
    app = document.getElementById("txtApp").value;
    apm = document.getElementById("txtApm").value;
    tel = document.getElementById("txtTel").value;
     correo = document.getElementById("txtcorreo").value;
      num = document.getElementById("txtnum").value;
    estado = document.getElementById("txtEstado").value;
    ciudad = document.getElementById("txtCiudad").value;
    colonia = document.getElementById("txtColonia").value;
    calle = document.getElementById("txtCalle").value;
    CP = document.getElementById("txtCP").value;
    numExt = document.getElementById("txtNExt").value;
    numInt = document.getElementById("txtNInt").value;
    let Estatus = document.getElementById("txtEstatus").value;
    let newProd = {};
    newProd.nombre = nombre;
    newProd.app = app;
    newProd.apm = apm;
    newProd.tel = tel;
    newProd.correo = correo;
    newProd.num = num;
    newProd.estado = estado;
    newProd.ciudad = ciudad;
    newProd.colonia = colonia;
    newProd.calle = calle;
    newProd.CP = CP;
    newProd.numExt = numExt;
    newProd.numInt = numInt;
     newProd.Estatus = Estatus;
    obj.push(newProd);

    let jsonData = JSON.stringify(obj);
    console.log(jsonData);
    console.log(typeof (jsonData));
    actualizaTabla();
    limpiar();
    document.getElementById("btnAgregar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");
    indexProductosSeleccionados = 0;

}

function modificaProducto(index) {
    index = indexProductosSeleccionados;
    if (index !== undefined && index !== null) {
        let nombre = document.getElementById("txtNombre").value;
        let app = document.getElementById("txtApp").value;//Falta Num Ext
        let apm = document.getElementById("txtApm").value;
        let tel = document.getElementById("txtTel").value;
        let correo = document.getElementById("txtcorreo").value;
        let num = document.getElementById("txtnum").value;
        let estado = document.getElementById("txtEstado").value;
        let ciudad = document.getElementById("txtCiudad").value;
        let colonia = document.getElementById("txtColonia").value;
        let calle = document.getElementById("txtCalle").value;
        let CP = document.getElementById("txtCP").value;
        let numExt = document.getElementById("txtNExt").value;
        let numInt = document.getElementById("txtNInt").value;
        let Estatus = document.getElementById("txtEstatus").value;
            obj[index].nombre = nombre;
            obj[index].app = app;
            obj[index].apm = apm;
            obj[index].tel = tel;
            obj[index].correo = correo;
            obj[index].num = num;
            obj[index].estado = estado;
            obj[index].ciudad = ciudad;
            obj[index].colonia = colonia;
            obj[index].calle = calle;
            obj[index].CP = CP;
            obj[index].numInt = numInt;
            obj[index].numExt = numExt;
            obj[index].Estatus = Estatus;

        
    }
    actualizaTabla();
    limpiar();
}


function eliminarProducto() {
    let index = indexProductosSeleccionados;
    console.log('Índice seleccionado:', index);
    
    if (index !== undefined && index !== null && index >= 0 && index < obj.length) {
        let producto = obj[index];
        
        console.log('Producto seleccionado:', producto);
        
        if (producto.Estatus.toLowerCase() === "desactivo") {
            if (confirm("¿Estás seguro de eliminar este producto?")) {
                obj.splice(index, 1);
              
            }
        } else {
            alert("Solo se puede eliminar productos con estatus 'desactivo'.");
        }
    } else {
        alert("Selecciona un producto antes de intentar eliminarlo.");
    }
      actualizaTabla();
                limpiar();
}
function search() {
    var num_cols, display, input, filter, table_body, tr, td, i, txtValue;
    num_cols = 7;
    input = document.getElementById("inputBusqueda");
    filter = input.value.toUpperCase();
    table_body = document.getElementById("tblProductos");
    tr = table_body.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        display = "none";
        for (j = 0; j < num_cols; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
        }
        tr[i].style.display = display;
      
    }
}
