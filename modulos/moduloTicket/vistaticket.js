let obj = [];
let indexProductoSeleccionado;
let path = "modulos/moduloTicket/";
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
        foreground: "#526d24",
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
    let IVA = 0.20;
 
    obj.forEach(function(elemento) {
        let tp = 0;   
        let registro = '<div class="card">' +
                       '<div class="card-header">Factura</div>' +
                       '<div class="card-body">' +
                       '<p class="card-text">Dirección Sucursal: ' + elemento.diresucursal + '</p>' +
                       '<p class="card-text">Nombre Cliente: ' + elemento.nomCliente + '</p>' +
                       '<p class="card-text">Dirección Cliente: ' + elemento.direcliente + '</p>';

        registro += '<div class="productos">';
    
        elemento.productos.forEach(function(producto) {
             tp += producto.Precio * producto.Cantidad;
            registro += '<div class="producto">' +
                        '<div class="row">' +
                        '<div class="col-md-6 mb-md-0 p-md-4">' +
                        '<img src="' + producto.foto + '" class="w-100">' +
                        '</div>' +
                        '<div class="col-md-6 p-4 ps-md-0">' +
                        '<h4 class="mt-0">' + producto.nomProd + '</h4>' +
                        '<p>Precio: ' + producto.Precio + '</p>' +
                        '<p>Categoría: ' + producto.Categoria + '</p>' +
                         '<p>Cantidad : ' + producto.Cantidad + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                
        }); 
         const tpp = tp * (1 + IVA);
        registro += '</div>';
        registro += '<div class="codigo-qr" id="codigo_' + obj.indexOf(elemento) + '">' +
                    '<img id="codigo_' + obj.indexOf(elemento) + '_img" alt="Código QR">' +
                    '<br><br>' +
                    '<button class="btn btn-outline-success" id="btndescargar_' + obj.indexOf(elemento) + '">Descargar QR</button>' +
                 '<br><br>' +      
                '<p>'+ 'Horario: '+ hd + '</p>'+
                       '<p>Total de productos:'+tp+'</p>'+
                         '<p>'+ 'IVA : '+ IVA + '</p>'+
                         '<p>'+ 'Total a pagar : '+ tpp+ '</p>'+
                    '<a href="GestTicket.html"> <button class="btn btn-outline-success">Editar</button></a>' +
                 '<br><br>' + 
                '</div>';      

        registro += '</div></div><br><br>';

        cuerpo += registro;
    });
    document.getElementById("ticket").innerHTML = cuerpo;
    const texto = "https://www.youtube.com/watch?v=gwOtPoGaKe8&list=RDDGjlmKo3Lig&index=27";
    obj.forEach(function(elemento) {
        const imagen = document.querySelector('#codigo_' + obj.indexOf(elemento) + '_img');
        const btnDescargar = document.querySelector('#btndescargar_' + obj.indexOf(elemento));
        sacarQR(texto, imagen, btnDescargar);
   
    });
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


