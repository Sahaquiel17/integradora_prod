
let obj = [];
let indexProductoSeleccionado;
let path = "http://localhost:8080/Proyecto1/modulos/modulosTarjeta/";
fetch(path + "tarjetas.json")
        .then((response) => {
            return response.json();
        })
        .then(function (jsondata) {
            obj = jsondata;
            console.log(obj);
            actuaLizaTabla();
        });
function actuaLizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<tr>' +
                '<tr onclick="selectPlatillo(' + obj.indexOf(elemento) + ');">' +
                '<td >' + obj.indexOf(elemento) + '</td>' +
                '<td>' + elemento.nombre + '</td>' +
                '<td>' + elemento.App + '</td>' +
                '<td>' + elemento.Apm + '</td>' +
                '<td>' + elemento.num + '</td>' +
                '<td>' + elemento.mm + '</td>' +
                '<td>' + elemento.yy + '</td>' +
                '<td>' + elemento.CVV + '</td>' +
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;

}

//visualizar la tabla
function selectPlatillo(index) {
    document.getElementById("txtnombre").value = obj[index].nombre;
    document.getElementById("txtApp").value = obj[index].App;
    document.getElementById("txtApm").value = obj[index].Apm;
    document.getElementById("txtnum").value = obj[index].num;
    document.getElementById("txtmm").value = obj[index].mm;
     document.getElementById("txtyy").value = obj[index].yy;
    document.getElementById("txtcvv").value = obj[index].CVV;
    indexProductoSeleccionado = index;
    document.getElementById("btnModificar").classList.remove("disabled");//se activa
    document.getElementById("btnLimpiar").classList.remove("disabled");//se activa
    document.getElementById("btnEliminar").classList.remove("disabled");//se activa
    document.getElementById("btnAgregar").classList.remove("disabled");//se desactiva

}


function limpiar() {
   document.getElementById("txtnombre").value = "";
    document.getElementById("txtApp").value = "";
    document.getElementById("txtApm").value = "";
     document.getElementById("txtnum").value = "";
     document.getElementById("txtmm").value = "";
     document.getElementById("txtyy").value = "";
     document.getElementById("txtcvv").value = "";
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("btnLimpiar").classList.add("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    indexProductoSeleccionado = 0;
}

function agregarPlatillo() {
    let nombre, App, Apm, num, mm,yy,CVV;
    nombre = document.getElementById("txtnombre").value;
    App = document.getElementById("txtApp").value;
    Apm = document.getElementById("txtApm").value;
     num = document.getElementById("txtnum").value;
    mm = document.getElementById("txtmm").value;
     yy = document.getElementById("txtyy").value;
    CVV = document.getElementById("txtcvv").value;
    let newProd = {};
    newProd.nombre = nombre;
    newProd.App = App;
    newProd.Apm = Apm;
    newProd.num = num;
    newProd.mm = mm;
    newProd.yy = yy;
    newProd.CVV = CVV;
    obj.push(newProd);
    let jsonData = JSON.stringify(obj);
    console.log(jsonData);
    console.log(typeof (jsonData));
    limpiar();
    actuaLizaTabla();
    document.getElementById("btnAgregar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");
    indexProductosSeleccionados = 0;

}
function modificaPlatillo(index) {
    index = indexProductoSeleccionado;
    if (index !== undefined && index !== null) {
        let nombre = document.getElementById("txtnombre").value;
        let App = document.getElementById("txtApp").value;
        let Apm = document.getElementById("txtApm").value;
        let num = document.getElementById("txtnum").value;
        let mm = document.getElementById("txtmm").value;
          let yy = document.getElementById("txtyy").value;
        let CVV = document.getElementById("txtcvv").value;
        if (confirm("¿Deseas modificar?"))
        {
            obj[index].nombre = nombre;
            obj[index].App = App;
            obj[index].Apm = Apm;
            obj[index].num = num;
            obj[index].mm = mm;
             obj[index].yy = yy;
            obj[index].CVV = CVV;
        } 
        actuaLizaTabla();
        limpiar();
    }
}
function eliminarPlatillo(index) {
    index = indexProductoSeleccionado;
    if (index !== undefined && index !== null) {
        if (confirm("¿Estás seguro de eliminar esta Tarjeta?")) {
            obj.splice(index, 1);
            actuaLizaTabla();
            limpiar();
        }
    } else {
        alert("Selecciona una tarjeta antes de intentar eliminarlo.");
    }
    actuaLizaTabla();
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
