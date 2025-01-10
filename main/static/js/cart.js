class Cart {
    constructor() {
        this.cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
        this.cartItemsList = document.getElementById('cart-items');
        this.cartTotal = document.getElementById('cart-total');
    }

    // Renderizar el carrito
    renderCart() {
        this.cartItemsList.innerHTML = '';
        let total = 0;

        this.cartItems.forEach((item, index) => {
            const volume = item.volumen || 0;
            const quantity = item.quantity || 0;
            const isPaint = volume > 0;
            const subtotal = isPaint ? item.price * volume : item.price * quantity;

            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <div>
                    <img src="${item.image}" style="width: 50px; height: 50px;" class="me-2">
                    ${item.name} - $${subtotal.toFixed(2)}
                </div>
                <input type="number" value="${isPaint ? volume : quantity}" data-index="${index}" 
                    class="quantity-input">
                <button class="btn btn-sm btn-danger remove-item" data-index="${index}">&times;</button>
            `;
            this.cartItemsList.appendChild(listItem);

            total += subtotal;
        });

        this.cartTotal.textContent = `$${total.toFixed(2)}`;
        this.saveCart();
    }

    // Agregar producto al carrito
    addToCart(product) {
        const existingProduct = this.cartItems.find(
            item => item.id === product.id && item.colorCode === product.colorCode
        );

        if (existingProduct) {
            if (product.volumen) existingProduct.volumen += product.volumen;
            else existingProduct.quantity += product.quantity;
        } else {
            this.cartItems.push(product);
        }

        this.renderCart();
    }

    // Guardar carrito en sessionStorage
    saveCart() {
        sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    // Inicializar eventos
    initEvents() {
        this.cartItemsList.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const index = e.target.dataset.index;
                const item = this.cartItems[index];
                item.quantity = parseInt(e.target.value);
                this.renderCart();
            }
        });

        this.cartItemsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const index = e.target.dataset.index;
                this.cartItems.splice(index, 1);
                this.renderCart();
            }
        });

        document.getElementById('checkout-btn').addEventListener('click', () => {
            fetch('/carrito/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(this.cartItems)
            }).then(response => {
                if (response.ok) window.location.href = '/carrito/';
                else console.error('Error al enviar el carrito.');
            });
        });
    }
}

// Inicializar carrito
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    cart.initEvents();
    cart.renderCart();
});
