// =============================
// Búsqueda de perro por nombre
// Filtra la galería mostrando solo las razas que coinciden con el texto ingresado
// =============================
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form'); // Formulario de búsqueda
    const searchInput = document.getElementById('search-input'); // Input de búsqueda
    const galeria = document.querySelector('.galeria'); // Contenedor de la galería
    const figures = document.querySelectorAll('.galeria figure'); // Todas las razas
    if (searchForm && searchInput && galeria) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            figures.forEach(fig => {
                const name = (fig.getAttribute('data-name') || '').trim().toLowerCase();
                if (query && name.includes(query)) {
                    fig.style.display = '';
                } else if (!query) {
                    fig.style.display = '';
                } else {
                    fig.style.display = 'none';
                }
            });
        });
        // Si el usuario borra el texto, mostrar todos
        searchInput.addEventListener('input', function() {
            if (!searchInput.value.trim()) {
                figures.forEach(fig => fig.style.display = '');
            }
        });
    }
});
// =============================
// Mostrar mensaje al enviar el formulario
// Al enviar el formulario, muestra un modal (o alerta) de confirmación de registro
// =============================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form.margen'); // Formulario principal
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Mostrar alerta bonita con Bootstrap si está disponible, si no, usar alert normal
            if (window.$ && typeof $.fn.modal === 'function') {
                // Crear modal si no existe
                let modal = document.getElementById('registroModal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.className = 'modal fade';
                    modal.id = 'registroModal';
                    modal.tabIndex = -1;
                    modal.innerHTML = `
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header" style="background: linear-gradient(90deg,#ff8400,#f7b97b); color: whitesmoke;">
                                    <h4 class="modal-title">¡Cuenta registrada!</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body" style="text-align:center; font-size:1.2rem; color:#b85c00;">
                                    Por favor verifica tu email para activar tu cuenta.<br>¡Gracias por unirte a la comunidad perruna! 🐾
                                </div>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                }
                $('#registroModal').modal('show');
            } else {
                alert('¡Cuenta registrada! Por favor verifica tu email para activar tu cuenta.');
            }
        });
    }
});
// =============================
// Filtro por tamaño (select desplegable)
// Muestra solo las razas según el tamaño seleccionado
// =============================
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('filter-select'); // Select de filtro por tamaño
    const items = document.querySelectorAll('.galeria figure'); // Todas las razas

    function applyFilter(filter) {
        items.forEach(el => {
            const size = el.dataset.size || 'large';
            el.classList.toggle('hidden', !(filter === 'all' || size === filter));
        });
    }

    if (select) {
        select.addEventListener('change', () => applyFilter(select.value));
        applyFilter('all'); // estado inicial
    }
});


// =============================
// Mostrar modal con detalles del perro al hacer click en la imagen
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const figures = document.querySelectorAll(".galeria figure"); // Todas las razas

    figures.forEach(fig => {
        fig.addEventListener("click", () => {
            const name = fig.getAttribute("data-name"); // Nombre de la raza
            const description = fig.getAttribute("data-description"); // Descripción
            const imgSrc = fig.querySelector("img").getAttribute("src"); // Imagen

            // Insertar datos en el modal
            document.getElementById("dogModalLabel").textContent = name;
            document.getElementById("dogDescription").textContent = description;
            document.getElementById("dogImage").setAttribute("src", imgSrc);

            // Mostrar modal (Bootstrap)
            $('#dogModal').modal('show');
        });
    });
});
