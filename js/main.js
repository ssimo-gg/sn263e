/* ── Mobile Navigation ──────────────────────────────────────────────── */
function initMobileNav() {
    const btn  = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(isOpen));
        btn.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Apri menu');
        });
    });
}

/* ── Back To Top Button ──────────────────────────────────────────────── */
function initBackToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) return;

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggleVisibility = () => {
        button.classList.toggle('is-visible', window.scrollY > 320);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
}

/* ── Copy Link URL ────────────────────────────────────────────────── */
function initCopyLinkUrl() {
    document.querySelectorAll('a.copy-link').forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault();
            const url = link.href;

            try {
                await navigator.clipboard.writeText(url);
                link.setAttribute('data-copied', 'true');
                setTimeout(() => link.removeAttribute('data-copied'), 1200);
            } catch (error) {
                console.error('Impossibile copiare l\'URL:', error);
            }
        });
    });
}

/* ────────────────────────────────────────────────── */
function init() {
    initMobileNav();
    initBackToTop();
    initCopyLinkUrl();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
