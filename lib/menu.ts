// The full carta, in the order the owner wants: Persian dishes first in each section.
// Prices in euros, VAT included. Farsi names should be checked by the kitchen before launch.

export type Dish = {
  id: string;
  es: string; // name on the menu (Latin script)
  en: string; // English name
  fa: string; // name in Farsi script
  price?: string; // omitted while unconfirmed
  description?: string;
  persian?: boolean;
  image?: string; // file in /public/images
};

export type MenuSection = {
  id: string;
  title: string;
  titleEs: string;
  fa: string;
  intro?: string;
  cover: string;
  dishes: Dish[];
};

export const menu: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    titleEs: "Entrantes",
    fa: "پیش‌غذا",
    cover: "/images/kashk-bademjan.jpg",
    dishes: [
      { id: "olivieh", es: "Ensalada rusa estilo persa", en: "Persian Olivier salad", fa: "سالاد الویه", price: "7,00", description: "Olivieh, the Persian potato salad, with toasts.", persian: true, image: "/images/olivieh.jpg" },
      { id: "kashk-bademjan", es: "Crema de berenjena estilo persa", en: "Persian aubergine dip", fa: "کشک بادمجان", price: "9,50", description: "Kashk-e bademjan: smoky aubergine with kashk, with toasts.", persian: true, image: "/images/kashk-bademjan.jpg" },
      { id: "ensalada-verde", es: "Ensalada verde", en: "Green salad", fa: "سالاد سبز", price: "8,50", description: "Mixed leaves, avocado, egg, carrot and tomato.", image: "/images/ensalada-verde.jpg" },
      { id: "tomate-mozzarella", es: "Ensalada de tomate y mozzarella", en: "Tomato and mozzarella salad", fa: "سالاد گوجه و موتزارلا", price: "10,00", image: "/images/tomate-mozzarella.jpg" },
      { id: "queso-cabra", es: "Ensalada con queso de cabra", en: "Goat cheese salad", fa: "سالاد پنیر بز", price: "10,00", description: "With walnuts.", image: "/images/queso-cabra.jpg" },
      { id: "verduras", es: "Verduras a la plancha", en: "Grilled vegetables", fa: "سبزیجات کبابی", price: "8,00" },
    ],
  },
  {
    id: "tapas",
    title: "Tapas",
    titleEs: "Tapas",
    fa: "تاپاس",
    cover: "/images/croquetas.jpg",
    dishes: [
      { id: "pan-tomate", es: "Pan con tomate", en: "Bread with tomato", fa: "نان با گوجه", price: "3,50", image: "/images/pan-tomate.jpg" },
      { id: "patatas-fritas", es: "Patatas fritas", en: "French fries", fa: "سیب‌زمینی سرخ‌کرده", price: "4,00", image: "/images/patatas-fritas.jpg" },
      { id: "padron", es: "Pimientos del Padrón", en: "Padrón peppers", fa: "فلفل پادرون", price: "5,90", image: "/images/padron.jpg" },
      { id: "bravas", es: "Patatas bravas", en: "Patatas bravas", fa: "پاتاتاس براواس", price: "7,00", image: "/images/bravas.jpg" },
      { id: "croquetas", es: "Croquetas (4 u.)", en: "Croquettes (4 pcs)", fa: "کروکت", price: "8,00", description: "Assorted, depending on the day.", image: "/images/croquetas.jpg" },
      { id: "champinones", es: "Champiñones salteados", en: "Sautéed mushrooms", fa: "قارچ تفت‌داده", price: "8,50", image: "/images/champinones.jpg" },
      { id: "anchoas", es: "Anchoas con tostadas", en: "Anchovies with toast", fa: "آنچوی با نان تست", price: "8,50" },
      { id: "alitas", es: "Alitas de pollo", en: "Chicken wings", fa: "بال مرغ", price: "8,90", description: "Glazed, with sesame.", image: "/images/alitas.jpg" },
      { id: "gyozas", es: "Gyozas (6 u.)", en: "Gyozas (6 pcs)", fa: "گیوزا", price: "11,00", description: "With soy dipping sauce.", image: "/images/gyozas.jpg" },
      { id: "tabla-queso", es: "Tabla de queso", en: "Cheese board", fa: "تخته پنیر", price: "15,50", image: "/images/tabla-queso.jpg" },
      { id: "jamon", es: "Tabla de jamón ibérico", en: "Iberian ham board", fa: "تخته ژامبون ایبریکو", price: "17,00", image: "/images/jamon.jpg" },
      { id: "mini-burgers", es: "Tabla de mini hamburguesas", en: "Mini burger board", fa: "مینی همبرگر", price: "20,50", description: "Three mini burgers in different flavours, with fries." },
    ],
  },
  {
    id: "fish",
    title: "Fish & Seafood",
    titleEs: "Pescados",
    fa: "ماهی و غذای دریایی",
    cover: "/images/paella.jpg",
    dishes: [
      { id: "tartar-salmon", es: "Tartar de salmón con aguacate", en: "Salmon tartare with avocado", fa: "تارتار سالمون با آووکادو", price: "15,90", image: "/images/tartar-salmon.jpg" },
      { id: "pescado-dia", es: "Pescado del día", en: "Fish of the day", fa: "ماهی روز", price: "17,50", description: "With fries or salad.", image: "/images/pescado-dia.jpg" },
      { id: "fish-chips", es: "Fish & chips", en: "Fish and chips", fa: "فیش اند چیپس", price: "18,80", description: "With tartare sauce.", image: "/images/fish-chips.jpg" },
      { id: "tartar-atun", es: "Tartar de atún fresco", en: "Fresh tuna tartare", fa: "تارتار تن ماهی تازه", price: "19,90" },
      { id: "gambones", es: "Gambones a la plancha", en: "Grilled king prawns", fa: "میگوی کبابی", price: "26,90" },
      { id: "paella", es: "Paella de marisco", en: "Seafood paella", fa: "پائلای دریایی", price: "16,00 / 28,90", description: "For one or for two.", image: "/images/paella.jpg" },
    ],
  },
  {
    id: "meat",
    title: "Meat",
    titleEs: "Carnes",
    fa: "گوشت",
    cover: "/images/solomillo.jpg",
    dishes: [
      { id: "pollo-azafran", es: "Pollo al azafrán con arroz", en: "Saffron chicken with rice", fa: "چلو مرغ زعفرانی", price: "18,90", description: "Chicken marinated in saffron, with Persian rice.", persian: true },
      { id: "khoresh", es: "Guiso persa del día con arroz", en: "Persian stew of the day", fa: "خورش روز با برنج", price: "17,50", description: "Khoresh, slow cooked. Ask which one is on today.", persian: true },
      { id: "cordero", es: "Cordero aromático con arroz, 500 g", en: "Aromatic lamb with rice, 500 g", fa: "گوشت بره معطر با برنج", price: "38,00", description: "Lamb spiced the Persian way.", persian: true },
      { id: "pollo-catalana", es: "Pollo a la catalana", en: "Catalan-style chicken", fa: "مرغ کاتالان", price: "15,90", description: "Braised with dried fruit, served on mash.", image: "/images/pollo-catalana.jpg" },
      { id: "lacon", es: "Lacón con patatas", en: "Cured pork shoulder with potatoes", fa: "لاکون با سیب‌زمینی", price: "14,90" },
      { id: "steak-tartar", es: "Steak tartar sobre tuétano", en: "Steak tartare on bone marrow", fa: "استیک تارتار روی مغز استخوان", price: "25,00", image: "/images/steak-tartar.jpg" },
      { id: "hamburguesa", es: "Hamburguesa con patatas", en: "Sirloin burger with fries", fa: "همبرگر فیله با سیب‌زمینی", price: "19,50", description: "Premium sirloin beef." },
      { id: "solomillo", es: "Solomillo salsa de pimienta", en: "Beef tenderloin, pepper sauce", fa: "فیله گوساله با سس فلفل", price: "27,00", description: "With fries or salad.", image: "/images/solomillo.jpg" },
      { id: "chuleton", es: "Chuletón 520 g", en: "Rib steak, 520 g", fa: "استیک دنده", price: "32,50", description: "With fries or salad.", image: "/images/chuleton.jpg" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    titleEs: "Postres",
    fa: "دسر",
    cover: "/images/tabla-queso.jpg",
    dishes: [
      { id: "helado-persa", es: "Helado con sabores persas", en: "Persian ice cream", fa: "بستنی سنتی", price: "6,50", description: "Pistachio or saffron.", persian: true },
      { id: "crema-catalana", es: "Crema catalana", en: "Crema catalana", fa: "کرم کاتالان", price: "5,00" },
      { id: "tarta-queso", es: "Tarta de queso", en: "Cheesecake", fa: "چیزکیک", price: "5,50" },
      { id: "mousse", es: "Mousse de chocolate", en: "Chocolate mousse", fa: "موس شکلات", price: "6,50", description: "With nuts." },
      { id: "bizcocho", es: "Bizcocho", en: "Sponge cake", fa: "کیک اسفنجی", price: "4,50", description: "With candied orange." },
    ],
  },
];

// Text-only lists from the daytime café offer.
export const cafe = {
  coffee: [
    { name: "Café con leche", price: "1,90" },
    { name: "Cortado", price: "1,70" },
    { name: "Americano", price: "1,70" },
    { name: "Té: frutos del bosque, manzanilla, negro, rojo o verde", price: "2,50" },
    { name: "Té en tetera", price: "4,00" },
  ],
  bocadillos: [
    { name: "Tortilla francesa", price: "3,50 / 2,50" },
    { name: "Tortilla francesa con queso", price: "4,50 / 3,50" },
    { name: "Fuet", price: "3,50 / 2,50" },
    { name: "Queso", price: "4,50 / 3,50" },
    { name: "Atún", price: "4,00 / 3,00" },
    { name: "Bikini", price: "3,50" },
    { name: "Croissant relleno", price: "4,25" },
    { name: "Jamón ibérico", price: "7,50 / 5,50" },
    { name: "Jamón serrano", price: "4,50 / 3,50" },
    { name: "Chorizo ibérico", price: "5,50 / 4,50" },
    { name: "Vegetal", price: "5,50 / 4,50" },
    { name: "Bacon con queso", price: "3,95 / 2,50" },
    { name: "Tostada con mantequilla y mermelada", price: "2,70" },
    { name: "Tostada con tomate", price: "2,70" },
  ],
  bolleria: [
    { name: "Croissant", price: "1,20" },
    { name: "Croissant Arg.", price: "1,10" },
    { name: "Napolitana de crema", price: "1,30" },
    { name: "Palmera multicereal", price: "1,20" },
  ],
};

export const signatureDishes = ["kashk-bademjan", "olivieh", "paella", "pollo-catalana", "solomillo", "steak-tartar", "croquetas", "tartar-salmon"]
  .map((id) => menu.flatMap((s) => s.dishes).find((d) => d.id === id)!)
  .filter(Boolean);
