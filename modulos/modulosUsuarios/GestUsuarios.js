
let obj = []; // arreglo que se llenara de objetos JSON
let indexProductosSeleccionados; // es el indice del arreglo
let path = "modulos/modulosUsuarios/";


fetch(path + "DatosUsuario.json")
        .then((response) => {
            return response.json();
        })
        .then(function (jsondata) {
            obj = jsondata;
            console.log(obj);
            actualizaTabla();
        });
        function validarCampos() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("txtNombre").value.trim();
    let contrasena = document.getElementById("txtContrasena").value.trim();
    let estatus = document.getElementById("txtEstatus").value.trim();
    // Verificar si algún campo está vacío
    if (!nombre || !contrasena || !estatus ) {
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
                '<td>' + elemento.nomProd + '<td>' +
                '<td>' + elemento.contrasena + '</td>' +
                '<td>' + elemento.Estatus + '</td>' +
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}



function selectProducto(index) {
    document.getElementById("txtNombre").value = obj[index].nomProd;
    document.getElementById("txtContrasena").value = obj[index].contrasena;
document.getElementById("txtEstatus").value = obj[index].Estatus;
   
    indexProductosSeleccionados = index;
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");

}

function limpiar() {
    document.getElementById("txtNombre").value = "";

    document.getElementById("txtContrasena").value = "";
    document.getElementById("txtEstatus").value = "";

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
     if (!validarCampos()) return; 
    let nombre, contrasena,estatus;
    nombre = document.getElementById("txtNombre").value;
estatus = document.getElementById("txtEstatus").value;

    contrasena = document.getElementById("txtContrasena").value;


    let newProd = {};
    newProd.nomProd = nombre;
newProd.Estatus = estatus;
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
let estatus = document.getElementById("txtEstatus").value;
        let contrasena = document.getElementById("txtContrasena").value;


        if (confirm("¿Desea cambiar el Usuario?")) {

            obj[index].nomProd = nombre;

            obj[index].contrasena = contrasena;
             obj[index].Estatus = estatus;

        } 
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




