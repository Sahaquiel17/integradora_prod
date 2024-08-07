
let obj = []; // arreglo que se llenara de objetos JSON
let indexProductosSeleccionados; // es el indice del arreglo
let path = "http://localhost:8080/Proyecto1/modulos/modulosUsuarios/";


fetch(path + "DatosUsuarios.json")
        .then((response) => {
            return response.json();
        })
        .then(function (jsondata) {
            obj = jsondata;
            console.log(obj);
            actualizaTabla();
        });
function actualizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<tr>' +
                '<tr onclick="selectProducto(' + obj.indexOf(elemento) + ');">' +
                '<td>' + obj.indexOf(elemento) + '</td>' +
                '<td>' + elemento.nomProd + '<td>' +
                '<td>' + elemento.contrasena + '</td>' +
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}



function selectProducto(index) {
    document.getElementById("txtNombre").value = obj[index].nomProd;
    document.getElementById("txtContrasena").value = obj[index].contrasena;

   
    indexProductosSeleccionados = index;
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");

}

function limpiar() {
    document.getElementById("txtNombre").value = "";

    document.getElementById("txtContrasena").value = "";



    document.getElementById("txtFotoRuta").value = "";
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("btnLimpiar").classList.add("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    indexProductosSeleccionados = 0;


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

// por cada requerimiento el lider lo hace que tipo de pruebas que se tiene que probar 1ra fila lider dice que tienes que crear /estandar son codigos / segundo reglon el tester prueba unitaria tester progamador los estatus llevan el control de cada prueba
function agregarProducto() {
    let nombre, contrasena, foto, tipo;
    nombre = document.getElementById("txtNombre").value;


    contrasena = document.getElementById("txtContrasena").value;


    let newProd = {};
    newProd.nomProd = nombre;

    newProd.contrasena = contrasena;


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

        let contrasena = document.getElementById("txtContrasena").value;


        if (confirm("¿Desea cambiar el Usuario?")) {

            obj[index].nomProd = nombre;

            obj[index].contrasena = contrasena;


        } else {
            obj[index].nomProd = nombre;

            obj[index].contrasena = contrasena;

        }
    }
    actualizaTabla();
    limpiar();
}

function eliminarProducto(index) {
    index = indexProductosSeleccionados;
    if (index !== undefined && index !== null) {
        if (confirm("¿Quieres borrar?")) {
            obj.splice(index, 1);
            actualizaTabla();
            limpiar();
        }
    } else {
        alert("Selecciona elemento a eliminar");
    }
    actualizaTabla();
    limpiar();
}

