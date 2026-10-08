export const WHATSAPP_NUMBER = "77068884116";
export const PHONE_DISPLAY = "+7 706 888 41 16";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Здравствуйте! Интересует лазерный станок CNC GROUP.",
)}`;

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
