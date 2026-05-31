function filterProjects(activeFilter) {
    document.querySelectorAll('.project-card').forEach(card => {
        const matches = activeFilter === 'all' || card.dataset.category === activeFilter;
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity    = matches ? '1' : '0.4';
        card.style.transform  = matches ? '' : 'translateY(4px)';
        card.style.pointerEvents = matches ? '' : 'none';
    });
}

function initPortfolioFilter() {
    const buttons = document.querySelectorAll('.toolbar__btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');
            filterProjects(btn.dataset.filter);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioFilter);
} else {
    initPortfolioFilter();
}
