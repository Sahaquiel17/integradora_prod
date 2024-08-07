let obj = [];
let indexProductoSeleccionado;
let path = "http://localhost:8080/Proyecto1/modulos/moduloTicket/";
fetch(path+"datoTicket.json")
        .then((response) => {
            return response.json();
        })
        .then(function (jsondata) {
            obj = jsondata;
            console.log(obj);
            ActualizaAlimentos();
        });

function sacarQR(texto, imagen, btnDescargar) {
    new QRious({
        element: imagen,
        value: texto,
        size: 200,
        backgroundAlpha: 0,
        foreground: "#684b04",
        level: "H"
    });

    btnDescargar.addEventListener("click", function() {
        const enlace = document.createElement("a");
        enlace.href = imagen.src;
        enlace.download = "CodigoQR.png";
        enlace.click();
    });
}


function ActualizaAlimentos() {
    let cuerpo = "";
    let hd = new Date();
    let IVA = 0.2;

    obj.forEach(function(elemento, indexElemento) {
        let tp = 0;
        let registro = '<div class="card">' +
                      
                       '<div class="card-body">' +
                        '<div class="card-header">Factura   '+ indexElemento+'</div>' +
                       '<p class="card-text">Dirección Sucursal: ' + elemento.diresucursal + '</p>' +
                       '<p class="card-text">Nombre Cliente: ' + elemento.nomCliente + '</p>' +
                       '<p class="card-text">Dirección Cliente: ' + elemento.direcliente + '</p>';

        registro += '<div class="productos">';

        elemento.productos.forEach(function(producto, indexProducto) {
            tp += producto.Precio * producto.Cantidad;
            registro += '<div class="producto" onclick="selectPlatillo(' + indexElemento + ', ' + indexProducto + ')">' +
                        '<div class="row">' +
                        '<div class="col-md-6 mb-md-0 p-md-4">' +
                        '<img src="' + producto.foto + '" class="w-100"><br><br>' + 
                        '</div>' +
                        '<div class="col-md-6 p-4 ps-md-0">' +
                        '<h4 class="mt-0">' + producto.nomProd + '</h4>' +
                        '<p>Precio: ' + producto.Precio + '</p>' +
                        '<p>Categoría: ' + producto.Categoria + '</p>' +
                        '<p>Cantidad: ' + producto.Cantidad + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>'+
                        '<button class="btn btn-light p-3 mb-2 bg-danger-subtle text-danger-emphasis border border-light" onclick="eliminarPlatillo(' + indexElemento + ', ' + indexProducto + ');">Eliminar Producto</button>'
                 +'<br><br>';
       });

        const tpp = tp * (1 + IVA);
        registro += '</div>';
        registro += '<div class="codigo-qr" id="codigo_' + indexElemento + '">' +
                    '<img id="codigo_' + indexElemento + '_img" alt="Código QR">' +
                    '<br><br>' +
                    '<button class="btn btn-light p-3 mb-2 bg-danger-subtle text-danger-emphasis border border-light" id="btndescargar_' + indexElemento + '">Descargar QR</button>' +
                    '<br><br>' +      
                    '<p>Horario: ' + hd + '</p>' +
                    '<p>Total de productos: ' + tp + '</p>' +
                    '<p>IVA: ' + IVA + '</p>' +
                    '<p>Total a pagar: ' + tpp + '</p>' +
                    '<button class="btn btn-light p-3 mb-2 bg-danger-subtle text-danger-emphasis border border-light"  onclick="eliminarTicket(' + indexElemento +');">Cancelar</button>&nbsp;&nbsp;' +
                    '<br><br>' +
                    '</div>';

        registro += '</div></div><br><br>';

        cuerpo += registro;  
    });

    document.getElementById("ticket").innerHTML = cuerpo;

    const texto = "https://www.youtube.com/watch?v=gwOtPoGaKe8&list=RDDGjlmKo3Lig&index=27";
    obj.forEach(function(elemento, indexElemento) {
        const imagen = document.querySelector('#codigo_' + indexElemento + '_img');
        const btnDescargar = document.querySelector('#btndescargar_' + indexElemento);
        sacarQR(texto, imagen, btnDescargar);
    });
}


function selectPlatillo(indexElemento, indexProducto) {
    const producto = obj[indexElemento].productos[indexProducto];
    document.getElementById("Cantidad").value = producto.Cantidad;
    document.getElementById("nombre").innerText = producto.nomProd;
    indexProductoSeleccionado = { elemento: indexElemento, producto: indexProducto };
}

function modificaTicket() {
    if (indexProductoSeleccionado !== undefined && indexProductoSeleccionado !== null) {
        const cantidadInput = document.getElementById("Cantidad");
        const cantidad = parseFloat(cantidadInput.value);

        if (!isNaN(cantidad) && cantidad > 0) {
            const { elemento, producto } = indexProductoSeleccionado;
            obj[elemento].productos[producto].Cantidad = cantidad;
            ActualizaAlimentos();
            limpiar();
        } else {
            alert('Por favor, ingrese una cantidad válida.');
        }
    } else {
        alert('No se ha seleccionado ningún platillo.');
    }
}


function limpiar() {
    document.getElementById("Cantidad").value = "";
    document.getElementById("nombre").innerText = "";
    indexProductoSeleccionado = 0;
}


function eliminarPlatillo(indexElemento, indexProducto) {
     const producto = obj[indexElemento].productos[indexProducto];
    if (producto !== undefined && producto !== null) {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
               obj[indexElemento].productos.splice(indexProducto, 1);
            ActualizaAlimentos();
            limpiar();
        }
    } else {
        alert("Selecciona un producto antes de intentar eliminarlo.");
    }
    ActualizaAlimentos();
    limpiar();
}


function eliminarTicket(indexElemento) {
    if (obj[indexElemento]) {
        if (confirm("¿Estás seguro de eliminar este ticket?")) {
            obj.splice(indexElemento, 1);
            ActualizaAlimentos();
            limpiar();
        }
    } else {
        alert("Selecciona un ticket válido antes de intentar eliminarlo.");
    }
}

function search() {
    let input = document.getElementById("inputBusqueda");
    let filter = input.value.toUpperCase().trim();
    let table_body = document.getElementById("ticket");
    let cards = table_body.getElementsByClassName("card");

    for (let card of cards) {
        let display = "none";
        let pElements = card.getElementsByTagName("p");
        let h4Elements = card.getElementsByTagName("h4");

        // Buscar en los elementos <p> y <h4>
        for (let element of [...pElements, ...h4Elements]) {
            if (element.textContent.toUpperCase().includes(filter)) {
                display = "";
                break;
            }
        }

        // Ajustar la visibilidad
        card.style.display = display;
    }
}