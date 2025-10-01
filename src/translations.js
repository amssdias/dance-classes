const SUPPORTED = ["en", "es"];
const DEFAULT_LANG = "en";

// cache loaded files so switching is instant
const cache = new Map();


function normalizeLang(lang) {
    if (!lang) return DEFAULT_LANG;
    const base = lang.toLowerCase().split("-")[0];
    return SUPPORTED.includes(base) ? base : DEFAULT_LANG;
}

export function detectLanguage() {
    const manual = localStorage.getItem("lang");
    if (manual) return normalizeLang(manual);

    const nav = navigator.languages?.[0] || navigator.language || DEFAULT_LANG;
    return normalizeLang(nav);
}

async function loadTranslations(lang) {
    const key = normalizeLang(lang);
    if (cache.has(key)) return cache.get(key);

    async function fetchJSON(code) {
        const url = `${import.meta.env.BASE_URL}locales/${code}.json`;
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Missing ${code}.json (HTTP ${res.status} at ${res.url})`);
        return res.json();
    }

    try {
        const data = await fetchJSON(key);
        cache.set(key, data);
        return data;
    } catch (_) {
        if (key !== DEFAULT_LANG) {
            const fallback = await fetchJSON(DEFAULT_LANG);
            cache.set(DEFAULT_LANG, fallback);
            return fallback;
        }
        throw _;
    }
}

function applyTranslations(dict) {
    document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        const val = dict[key];
        if (typeof val === "string") el.textContent = val;
    });

    // Attribute translations: data-i18n-attr="placeholder:title"
    // document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    //     const map = el.getAttribute("data-i18n-attr"); // e.g. "placeholder:title"
    //     map.split(":").forEach((attr) => {
    //         const key = el.getAttribute(`data-i18n-${attr}`);
    //         if (key && dict[key]) el.setAttribute(attr, dict[key]);
    //     });
    // });
}

/** Public API: initialize current language (detect + render) */
export async function initI18n() {
    // const lang = detectLanguage();
    const lang = "es";
    const dict = await loadTranslations(lang);
    document.documentElement.setAttribute("lang", lang);
    applyTranslations(dict);
}

/** Public API: manually set language (e.g., from buttons) */
export async function setLanguage(lang) {
    const code = normalizeLang(lang);
    localStorage.setItem("lang", code);
    const dict = await loadTranslations(code);
    document.documentElement.setAttribute("lang", code);
    applyTranslations(dict);
}