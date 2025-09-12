// Búsqueda de perro por nombre
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const galeria = document.querySelector('.galeria');
    const figures = document.querySelectorAll('.galeria figure');
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
// Mostrar mensaje al enviar el formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form.margen');
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
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('filter-select');
    const items = document.querySelectorAll('.galeria figure');

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


document.addEventListener("DOMContentLoaded", () => {
    const figures = document.querySelectorAll(".galeria figure");

    figures.forEach(fig => {
        fig.addEventListener("click", () => {
            const name = fig.getAttribute("data-name");
            const description = fig.getAttribute("data-description");
            const imgSrc = fig.querySelector("img").getAttribute("src");

            // Insertar datos en el modal
            document.getElementById("dogModalLabel").textContent = name;
            document.getElementById("dogDescription").textContent = description;
            document.getElementById("dogImage").setAttribute("src", imgSrc);

            // Mostrar modal (Bootstrap)
            $('#dogModal').modal('show');
        });
    });
});
