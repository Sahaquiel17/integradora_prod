document.addEventListener('DOMContentLoaded', function () {
    let total = 0;
    let path = "http://localhost:8080/Proyecto1/modulos/modulosProductos_yuli/";


    fetch(path + "productos.json")
            .then(response => response.json())
            .then(data => {
                let productList = document.getElementById('product-list');
                data.forEach(function (product) {
                    let productCard = `
                    <div class="col-md-4">
                        <div class="product-card">
                            <img src="${product.foto}" alt="${product.nomProd}">
                            <h5 class="mt-2">${product.nomProd}</h5>
                              <p>${product.descripcion}</p>
                             <p>${product.tipo}</p>
                             <p>${product.estatus}</p>
                              <p>$${product.precio.toFixed(2)}</p>
                           
                           
                             
                            <center><button class="btn btn-danger add-to-cart" data-nomProd="${product.nomProd}"  data-descripcion="${product.descripcion}"" data-tipo="${product.tipo}" data-estatus="${product.estatus}"data-precio="${product.precio}"->Agregar al carrito</button></center
                        </div>
                    </div>
                `;
                    productList.innerHTML += productCard;
                });


                document.querySelectorAll('.add-to-cart').forEach(function (button) {
                    button.addEventListener('click', function () {
                        const nomProd = this.getAttribute('data-nomProd');
                        const descripcion = this.getAttribute('data-descripcion');
                        const tipo = this.getAttribute('data-tipo');
                        const estatus = this.getAttribute('data-estatus');
                        const precio = parseFloat(this.getAttribute('data-precio'));

                        const cartItem = `
                        <div class="cart-item">
                            <span class="celda">${nomProd}</span>
                          <span class="celda">${descripcion}</span>
                            <span class="celda">${tipo}</span>
                            <span class="celda">${estatus}</span>
                            <span class="celda">$${precio.toFixed(2)}</span>
                          
                        
                           
                        </div>
                    `;

                        document.getElementById('cart').innerHTML += cartItem;
                        total += precio;
                        document.getElementById('total').innerText = total.toFixed(2);
                    });
                });
            });

    document.getElementById('checkout').addEventListener('click', function () {
        alert('Gracias por su compra!');
        document.getElementById('cart').innerHTML = '';
        total = 0;
        document.getElementById('total').innerText = total.toFixed(2);
    });
});
function search() {
     var num_cols, display, input, filter, table_body, p, h5,div, i, txtValue;
    num_cols = 3;
    input = document.getElementById("inputBusqueda");
    filter = input.value.toUpperCase();
    table_body = document.getElementById("product-list");
    div = table_body.getElementsByTagName("div");

    for (i = 0; i < div.length; i++) {
        display = "none";
        for (j = 0; j < num_cols; j++) {
            p = div[i].getElementsByTagName("p")[j];
            h5 = div[i].getElementsByTagName("h5")[j];
            if (p) {
                txtValue = p.textContent || p.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
             if (h5) {
                txtValue = h5.textContent || h5.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
        }
        div[i].style.display = display;
      
    }
}