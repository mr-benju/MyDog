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
