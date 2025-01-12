
const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Renderizar el carrito
const renderCart = () => {
    cartItemsList.innerHTML = '';
    let total = 0;

    //Manejo de la renderizacion y estructura del carrito

    cartItems.forEach((item, index) => {
        const volume = item.volumen || 0; // Si no hay volumen, mostrar 0
        const quantity = item.quantity || 0; // Si no hay cantidad, mostrar 0

        // Determinar el subtotal basado en el tipo de producto
        const isPaint = volume > 0; // Si hay volumen, asumimos que es pintura
        const subtotal = isPaint ? item.price * volume : item.price * quantity;

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        // Detalles del producto con campos obligatorios y condicionales
        //la cantidad de el producto pintura siempre deberia ser 1, el volumen es lo que se utiliza para calcular el total
        let productDetails = `
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center" style="gap: 10px;">
                <img src="${item.image}" style="width: 50px; height: 50px;" class="me-2">
                <div>
                    <span>${item.name}</span>
                    ${isPaint ? `<br><small class="text-muted">Cantidad: 1</small>` : ''}
                </div>
            </div>
            <div class="d-flex align-items-center" style="gap: 10px; margin-left:10px">
                <label for="input-${index}" class="me-2">${isPaint ? 'Volumen' : 'Cantidad'}:</label>
                <input type="number" id="input-${index}" value="${isPaint ? volume : quantity}" min="1" 
                    data-index="${index}" 
                    class="form-control form-control-sm quantity-input" 
                    style="width: 65px; text-align: center;">
                    <span class="fw-bold ms-3">$${Math.round(subtotal).toLocaleString()}</span>
                <button class="btn btn-sm btn-danger remove-item" 
                    data-index="${index}" 
                    style="padding: 4px 8px; border-radius: 5px;">&times;</button>
            </div>
        </div>
    `;

        listItem.innerHTML = productDetails;
        cartItemsList.appendChild(listItem);
        total += subtotal; // Sumar al total general
    });

    
    cartTotal.textContent = `$${Math.round(total).toLocaleString()}`;
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
};

// Función para agregar productos generales al carrito

function addToCart(product) {
    const existingProduct = cartItems.find(item => item.id === product.id && item.colorCode === product.colorCode);

    if (existingProduct) {
        if (product.volumen) {
            existingProduct.volumen += product.volumen; // Sumar volumen si es pintura
        } else {
            existingProduct.quantity += product.quantity; // Sumar cantidad si es producto normal
        }
    } else {
        cartItems.push(product);
    }            
    renderCart();
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('cart-sidebar'));
    offcanvas.show();
}

// Manejo del volumen y cantidad de los productos del carrito

cartItemsList.addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        const index = e.target.dataset.index;
        const item = cartItems[index];

        if (item.volumen !== undefined) {
            item.volumen = parseFloat(e.target.value); // Actualizar volumen
        } else {
            item.quantity = parseInt(e.target.value); // Actualizar cantidad
        }
        
        renderCart(); 
    }
});

//Manejo de la eliminacion de los productos del carrito

cartItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cartItems.splice(index, 1);
        renderCart();
    }
});

//funcion creada para cambiar las comas opr puntos de los valores mostrados
function formatNumberWithDot(num) {
    // Convierte el número en un formato con puntos como separador de miles
    return num.toLocaleString('es-CL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).replace(",", ".");
}



//boton para guardar mandar los datos del carrito e ir a la seccion "carrito" donde te deberia pedir mas datos para ir a pagar

document.getElementById('checkout-btn').addEventListener('click', () => {
            fetch('/carrito/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(cartItems)
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = '/carrito/';
                    } else {
                        console.error('Error al enviar los datos del carrito.');
                    }
                });
        }); 

//boton para mostrar el carrito actual de la seccion productos

document.getElementById('show-cart-btn').addEventListener('click', () => {
            renderCart();  // Asegúrate de renderizar el carrito
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('cart-sidebar'));
            offcanvas.show();
        });