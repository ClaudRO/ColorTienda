        
        let productos_lista = "{{ cart_items | escapejs  }}" 
        

            document.addEventListener("DOMContentLoaded", function () {
                const nameFormulario = document.getElementById("nombre");
                const rutFormulario = document.getElementById("rut");
                const telefonoFormulario = document.getElementById("telefono");
                const correoFormulario = document.getElementById("correo");
                const direccionFormulario = document.getElementById("direccion");
                
                const form = document.getElementById("envio-form");
                const zona = document.getElementById("zona");
                const totalDisplay = document.getElementById("total-display");
                const transbankBtn = document.getElementById("transbank-btn");
                const subtotalElements = document.querySelectorAll("tbody tr td:nth-child(4)");
                const toastEnvio = new bootstrap.Toast(document.getElementById("toast-envio"));
        
                const url_tbk = "{% url 'iniciar_pago' %}";
                // const csrf ="{% csrf_token %}"
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                console.log("holamundo")
                console.log(csrftoken);

                document.querySelector(".btn-send-tbk").addEventListener("click", () =>{
                    
                    console.log(productos_lista)

                    const data_post = {
                        nombre: nameFormulario.value,
                        rut: rutFormulario.value,
                        telefono: telefonoFormulario.value,
                        correo: correoFormulario.value,
                        zona: zona.value,
                        direccion: direccionFormulario.value,
                        total: totalFinal,
                        productos: JSON.stringify(productos_lista)
                    }

                    //window.location.href = `${url_tbk}?total=${totalFinal}`

                    fetch(`${url_tbk}?total=${totalFinal}`,{
                        method: 'POST', // Método de la solicitud
                        headers: {
                            'Content-Type': 'application/json', // Indicar que el cuerpo es JSON
                            'X-CSRFToken': csrftoken
                        },
                        body: JSON.stringify(data_post) // Convertir el objeto a un string JSON
                    }).then(response => response.json()).then(res =>{
                        console.log('Iniciando data')
                        console.log(res.data);
                        const url = res.data;
                        window.location.href = url
                    }).catch(err =>{
                        console.log(err);
                    })

                })

               


            // Función para calcular el total base basado en los subtotales
            function calcularTotalBase() {
                let total = 0;
                subtotalElements.forEach(el => {
                    const subtotal = parseFloat(el.textContent.replace("$", "").replace(",", "")) || 0;
                    total += subtotal;
                });
                return total;
            }
    
            // Inicializar el total base
            let totalBase = calcularTotalBase();
            let totalFinal = totalBase;
    
            // Mostrar el total inicial
            totalDisplay.textContent = totalBase.toFixed(2);
    
            // Detectar cambios en la selección de la zona de envío
            zona.addEventListener("change", function () {
                const selectedOption = zona.options[zona.selectedIndex];
                const costoEnvio = parseFloat(selectedOption.dataset.costo) || 0;
                totalFinal = totalBase + costoEnvio;
    
                // Actualizar el total mostrado
                totalDisplay.textContent = totalFinal.toFixed(2);
            });
    
            // Manejar el envío del formulario
            form.addEventListener("submit", function (e) {
                e.preventDefault();
    
    
                // llama a al funcion de tbk
                if (form.checkValidity()) {
                    // Actualizar el enlace del botón de Transbank con el nuevo total
                    const iniciarPagoUrl = "{% url 'iniciar_pago' %}";
                    transbankBtn.href = `${iniciarPagoUrl}?total=${totalFinal}`;
                    transbankBtn.style.display = "block";
    
                    // Mostrar el Toast
                    toastEnvio.show();
                } else {
                    alert("Por favor, completa todos los campos del formulario.");
                }
            });
        });
        const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
        const cartItemsList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        // Renderizar el carrito
        const renderCart = () => {
            cartItemsList.innerHTML = '';
            let total = 0;

            cartItems.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
    <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center" style="gap: 10px;">
            <img src="${item.image}" style="width: 50px; height: 50px;" class="me-2">
            <span>${item.name}</span>
        </div>
        <div class="d-flex align-items-center" style="gap: 10px; margin-left:10px">
            <input type="number" value="${item.quantity}" min="1" 
                data-index="${index}" 
                class="form-control form-control-sm quantity-input" 
                style="width: 65px; text-align: center;">
            <span class="fw-bold ms-3">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="btn btn-sm btn-danger remove-item" 
                data-index="${index}" 
                style="padding: 4px 8px; border-radius: 5px;">&times;</button>
        </div>
    </div>
`;
        
                cartItemsList.appendChild(listItem);
                total += item.price * item.quantity;
            });

            cartTotal.textContent = `$${total.toFixed(2)}`;
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
        };

        // Agregar al carrito
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const product = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    type: button.dataset.type,
                    price: parseFloat(button.dataset.price),
                    image: button.dataset.image,
                    quantity: 1
                };

                const existingProduct = cartItems.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cartItems.push(product);
                }

                renderCart();
                const offcanvas = new bootstrap.Offcanvas(document.getElementById('cart-sidebar'));
                offcanvas.show();
            });
        });

        // Modificar cantidades y eliminar productos
        cartItemsList.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const index = e.target.dataset.index;
                cartItems[index].quantity = parseInt(e.target.value);
                renderCart();
            }
        });

        cartItemsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const index = e.target.dataset.index;
                cartItems.splice(index, 1);
                renderCart();
            }
        });

        // Renderizar el carrito al cargar la página
        renderCart();

        // Botón de ir a pagar
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