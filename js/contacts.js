const STATES = {
    idle:    { label: 'INVIA MESSAGGIO', cls: null,            disabled: false },
    loading: { label: 'INVIO IN CORSO',  cls: 'btn--loading',  disabled: true  },
    error:   { label: '✕ RIPROVA',       cls: 'btn--error',    disabled: false },
};

function setButtonState(btn, labelSpan, stateKey) {
    const { label, cls, disabled } = STATES[stateKey];
    btn.classList.remove('btn--loading', 'btn--error');
    if (cls) btn.classList.add(cls);
    labelSpan.textContent = label;
    btn.disabled = disabled;
    btn.setAttribute('aria-busy', String(disabled));
}

function showOverlay() {
    const overlay = document.getElementById('form-overlay');
    if (!overlay) return;
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
    document.getElementById('overlay-close')?.focus();
}

function hideOverlay() {
    const overlay = document.getElementById('form-overlay');
    if (!overlay) return;
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
}

async function submitToFormspree(form, btn, labelSpan) {
    setButtonState(btn, labelSpan, 'loading');

    try {
        const response = await fetch(form.action, {
            method:  'POST',
            body:    new FormData(form),
            headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
            setButtonState(btn, labelSpan, 'idle');
            form.reset();
            showOverlay();
        } else {
            setButtonState(btn, labelSpan, 'error');
            setTimeout(() => setButtonState(btn, labelSpan, 'idle'), 3000);
        }
    } catch {
        setButtonState(btn, labelSpan, 'error');
        setTimeout(() => setButtonState(btn, labelSpan, 'idle'), 3000);
    }
}

function initContactForm() {
    const form = document.querySelector('#cg-form');
    if (!form) return;

    const btn       = form.querySelector('[type="submit"]');
    const labelSpan = btn?.querySelector('.btn__label');
    if (!btn || !labelSpan) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        await submitToFormspree(form, btn, labelSpan);
    });

    document.getElementById('overlay-close')?.addEventListener('click', hideOverlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideOverlay();
    });

    document.getElementById('form-overlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) hideOverlay();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}