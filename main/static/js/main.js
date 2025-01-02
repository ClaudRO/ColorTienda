document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('color-zoom-modal');
    const zoomColor = document.getElementById('zoom-color');
    const colorName = document.getElementById('color-name');
    const colorCode = document.getElementById('color-code');
    const closeModal = document.getElementById('close-modal');
    const relatedColorsContainer = document.getElementById('related-colors');

    // Mostrar colores relacionados
    function mostrarColoresRelacionados(colorHex) {
        const colorData = colorsRelatedMap[colorHex];
        relatedColorsContainer.innerHTML = `<h2>Colores Relacionados:</h2>`;

        if (!colorData.related || colorData.related.length === 0) {
            relatedColorsContainer.innerHTML += `<p>No hay colores relacionados disponibles.</p>`;
            return;
        }

        colorData.related.forEach(c => {
            const div = document.createElement('div');
            div.style.backgroundColor = c.hex;
            div.style.height = '50px';
            div.style.width = '50px';
            div.style.display = 'inline-block';
            div.style.margin = '5px';
            div.style.cursor = 'pointer';

            // Al hacer clic, mostrar el zoom del color
            div.addEventListener('click', () => mostrarZoomColor(c));
            relatedColorsContainer.appendChild(div);
        });
    }

    // Mostrar el modal con zoom del color
    function mostrarZoomColor(color) {
        zoomColor.style.backgroundColor = color.hex;
        colorName.textContent = color.name;
        colorCode.textContent = color.hex;
        modal.style.display = 'flex';
    }

    // Cerrar el modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de él
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Agregar eventos a las tarjetas de colores principales
    const colorCards = document.querySelectorAll('.color-card');
    colorCards.forEach(card => {
        card.addEventListener('click', function () {
            const colorHex = card.dataset.color; // Obtener el código del color
            mostrarColoresRelacionados(colorHex);
        });
    });
});
