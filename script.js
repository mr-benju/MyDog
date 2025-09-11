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