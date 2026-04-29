const WHATSAPP_NUMBER = "551155226708";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const form = document.querySelector("[data-contact-form]");
const whatsappButton = document.querySelector("[data-whatsapp]");
const revealItems = document.querySelectorAll(".reveal");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function defaultMessage() {
  return "Olá, gostaria de falar com um advogado sobre meu caso.";
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});

whatsappButton?.addEventListener("click", (event) => {
  event.preventDefault();
  window.open(buildWhatsAppUrl(defaultMessage()), "_blank", "noopener,noreferrer");
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const area = String(data.get("area") || "").trim();
  const message = String(data.get("message") || "").trim();

  const text = [
    "Olá, gostaria de falar com um advogado sobre meu caso.",
    `Meu nome é ${name}.`,
    `Meu WhatsApp é ${phone}.`,
    `Área jurídica: ${area}.`,
    `Descrição do caso: ${message}`,
  ].join("\n");

  window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));
