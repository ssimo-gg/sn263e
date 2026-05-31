const SKILL_GRADIENT = [
    { pct:   0, r: 0x38, g: 0x38, b: 0x38 },
    { pct:  20, r: 0x2d, g: 0x3d, b: 0x00 },
    { pct:  40, r: 0x47, g: 0x6b, b: 0x0d },
    { pct:  60, r: 0x3d, g: 0x9a, b: 0x1a },
    { pct:  80, r: 0x92, g: 0xdb, b: 0x3f },
    { pct: 100, r: 0xb6, g: 0xff, b: 0x62 },
];

function interpolateSkillColor(percentage) {
    const clamped = Math.min(100, Math.max(0, percentage));
    let lower = SKILL_GRADIENT[0];
    let upper = SKILL_GRADIENT[SKILL_GRADIENT.length - 1];

    for (let i = 0; i < SKILL_GRADIENT.length - 1; i++) {
        if (clamped >= SKILL_GRADIENT[i].pct && clamped <= SKILL_GRADIENT[i + 1].pct) {
            lower = SKILL_GRADIENT[i];
            upper = SKILL_GRADIENT[i + 1];
            break;
        }
    }

    const ratio = lower.pct === upper.pct
        ? 0
        : (clamped - lower.pct) / (upper.pct - lower.pct);

    const r = Math.round(lower.r + ratio * (upper.r - lower.r));
    const g = Math.round(lower.g + ratio * (upper.g - lower.g));
    const b = Math.round(lower.b + ratio * (upper.b - lower.b));

    return `rgb(${r}, ${g}, ${b})`;
}

function initSkillColors() {
    document.querySelectorAll('.skill-card__fill').forEach(fill => {
        const pct = parseFloat(fill.style.width);
        if (!isNaN(pct)) fill.style.background = interpolateSkillColor(pct);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillColors);
} else {
    initSkillColors();
}
