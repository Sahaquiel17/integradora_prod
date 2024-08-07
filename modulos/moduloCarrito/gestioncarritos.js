document.addEventListener('DOMContentLoaded', function () {
    let total = 0;
    const path = "http://localhost:8080/Proyecto1/modulos/moduloProductos/";
    const productList = document.getElementById('product-list');
    const cart = document.getElementById('cart');
    const totalElement = document.getElementById('total');

    fetch(path + "datoProductos.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(function (product) {
                const productCard = `
                    <div class="col-md-4">
                        <div class="product-card">
                            <img src="${product.foto}" alt="${product.nomProd}" style="width: 100%; height: auto;">
                            <center><h3 class="mt-2">${product.nomProd}</h3></center>
                            <p>${product.Descripcion}</p>
                            <p>${product.Categoria}</p>
                            <p>${product.Estatus}</p>
                            <p>$${product.Precio}</p>
                            <center>
                                <button class="btn btn-danger add-to-cart" 
                                    data-nomProd="${product.nomProd}"  
                                    data-Descripcion="${product.Descripcion}"
                                    data-Categoria="${product.Categoria}" 
                                    data-Estatus="${product.Estatus}"
                                    data-precio="${product.Precio}">
                                    Agregar al carrito
                                </button>
                            </center>
                        </div>
                    </div>
                `;
                productList.innerHTML += productCard;
            });

            // Agregar eventos a los botones después de que se haya añadido el contenido
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function () {
                    const nomProd = this.getAttribute('data-nomProd');
                    const Descripcion = this.getAttribute('data-Descripcion');
                    const Categoria = this.getAttribute('data-Categoria');
                    const Estatus = this.getAttribute('data-Estatus');
                    const Precio = parseFloat(this.getAttribute('data-precio'));

                    const cartItem = `
                        <div class="cart-item">
                            <span class="celda">${nomProd}</span>
                            <span class="celda">${Descripcion}</span>
                            <span class="celda">${Categoria}</span>
                            <span class="celda">${Estatus}</span>
                            <span class="celda">$${Precio.toFixed(2)}</span>
                        </div>
                    `;

                    cart.innerHTML += cartItem;
                    total += Precio; // Sumar correctamente
                    totalElement.innerText = `$${total.toFixed(2)}`; // Mostrar total con 2 decimales
                });
            });
        });

    document.getElementById('checkout').addEventListener('click', function () {
        alert('Gracias por su compra!');
        cart.innerHTML = '';
        total = 0; 
        totalElement.innerText = `Total: $0`;
    });
});

function search() {
    const input = document.getElementById("inputBusqueda");
    const filter = input.value.toUpperCase();
    const productList = document.getElementById("product-list");
    const cards = productList.getElementsByClassName("product-card");

    Array.from(cards).forEach(card => {
        const texts = card.innerText.toUpperCase();
        if (texts.includes(filter)) {
            card.parentElement.style.display = ""; // Muestra el contenedor
        } else {
            card.parentElement.style.display = "none"; // Oculta el contenedor
        }
    });
}
