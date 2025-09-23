import './styles/scss/main.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

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
