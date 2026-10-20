// Restaurant facts used across the site. Change them here and every page follows.
export const site = {
  name: "Azafrán Pérsico",
  tagline: "Persian kitchen, Mediterranean table",
  description:
    "Persian and Mediterranean restaurant in Barcelona's Eixample. Saffron kebabs, Persian stews, tapas and paella, cooked with real saffron from Iran.",
  url: "https://azafranpersico.online",
  address: {
    street: "Carrer de Girona, 127",
    corner: "corner of Carrer de Mallorca, 317",
    city: "08037 Barcelona",
    area: "Eixample",
  },
  phone: { display: "665 42 12 88", tel: "+34665421288", whatsapp: "https://wa.me/34665421288" },
  // TODO: add the restaurant's email address once confirmed.
  email: "",
  instagram: { handle: "@azafran_persico", url: "https://www.instagram.com/azafran_persico/" },
  hours: [
    { days: "Monday", time: "Closed" },
    { days: "Tuesday to Sunday", time: "11:30 to 00:00" },
  ],
  mapsLink: "https://maps.google.com/?q=Azafr%C3%A1n+P%C3%A9rsico,+Carrer+de+Girona+127,+08037+Barcelona",
  mapsEmbed: "https://www.google.com/maps?q=Carrer+de+Girona+127,+08037+Barcelona&z=16&output=embed",
  rating: "4.8",
} as const;

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
] as const;
