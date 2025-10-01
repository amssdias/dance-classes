import './styles/scss/main.scss'
import { initI18n } from "./translations.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initI18n();
});

document.querySelectorAll(".faq__item").forEach(function (cardElement) {
    cardElement.addEventListener("click", displayCardParagraph);
})


function displayCardParagraph() {
    const btn = this.querySelector(".faq__question");
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !isExpanded);

    const paragraph = this.querySelector(".faq__answer");
    paragraph.toggleAttribute("hidden");
}
