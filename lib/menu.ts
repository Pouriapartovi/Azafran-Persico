import type { Locale } from "./i18n/config";

// The full carta, in the order the owner wants: Persian dishes first in each section.
// Prices in euros, VAT included. `es` is the name printed on the menu; `fa` is the Farsi name.
// Translations (name and description) are per language. Have the kitchen check them before launch.

type T = Record<Locale, string>;

export type Dish = {
  id: string;
  es: string;
  fa: string;
  name: Omit<T, "es" | "fa">; // translated name for en, ca, fr
  desc?: T;
  price?: string; // left out while unconfirmed: the site shows "Ask us"
  persian?: boolean;
  image?: string; // file in /public/images
};

export type MenuSection = { id: string; title: T; cover: string; dishes: Dish[] };

const d = (en: string, es: string, ca: string, fr: string, fa: string): T => ({ en, es, ca, fr, fa });

export const menu: MenuSection[] = [
  {
    id: "starters",
    title: d("Starters", "Entrantes", "Entrants", "Entrées", "پیش‌غذا"),
    cover: "/images/kashk-bademjan.jpg",
    dishes: [
      { id: "olivieh", es: "Ensalada rusa estilo persa", fa: "سالاد الویه", name: { en: "Persian Olivier salad", ca: "Ensaladilla russa persa", fr: "Salade Olivier persane" }, price: "7,00", persian: true, image: "/images/olivieh.jpg",
        desc: d("Olivieh, the Persian potato salad, with toasts.", "Olivieh, la ensaladilla de patata persa, con tostadas.", "Olivieh, l'ensaladilla de patata persa, amb torrades.", "Olivieh, la salade de pommes de terre persane, avec des toasts.", "الویه، سالاد سیب‌زمینی ایرانی، با نان تست.") },
      { id: "kashk-bademjan", es: "Crema de berenjena estilo persa", fa: "کشک بادمجان", name: { en: "Persian aubergine dip", ca: "Crema d'albergínia persa", fr: "Crème d'aubergine persane" }, price: "9,50", persian: true, image: "/images/kashk-bademjan.jpg",
        desc: d("Kashk-e bademjan: smoky aubergine with kashk, with toasts.", "Kashk-e bademjan: berenjena ahumada con kashk, con tostadas.", "Kashk-e bademjan: albergínia fumada amb kashk, amb torrades.", "Kashk-e bademjan : aubergine fumée au kashk, avec des toasts.", "بادمجان دودی با کشک، با نان تست.") },
      { id: "ensalada-verde", es: "Ensalada verde", fa: "سالاد سبز", name: { en: "Green salad", ca: "Amanida verda", fr: "Salade verte" }, price: "8,50", image: "/images/ensalada-verde.jpg",
        desc: d("Mixed leaves, avocado, egg, carrot and tomato.", "Mezclum, aguacate, huevo, zanahoria y tomate.", "Mesclum, alvocat, ou, pastanaga i tomàquet.", "Mesclun, avocat, œuf, carotte et tomate.", "کاهوی مخلوط، آووکادو، تخم‌مرغ، هویج و گوجه.") },
      { id: "tomate-mozzarella", es: "Ensalada de tomate y mozzarella", fa: "سالاد گوجه و موتزارلا", name: { en: "Tomato and mozzarella salad", ca: "Amanida de tomàquet i mozzarella", fr: "Salade tomate mozzarella" }, price: "10,00", image: "/images/tomate-mozzarella.jpg" },
      { id: "queso-cabra", es: "Ensalada con queso de cabra", fa: "سالاد پنیر بز", name: { en: "Goat cheese salad", ca: "Amanida amb formatge de cabra", fr: "Salade au chèvre" }, price: "10,00", image: "/images/queso-cabra.jpg",
        desc: d("With walnuts.", "Con nueces.", "Amb nous.", "Aux noix.", "با گردو.") },
      { id: "verduras", es: "Verduras a la plancha", fa: "سبزیجات کبابی", name: { en: "Grilled vegetables", ca: "Verdures a la planxa", fr: "Légumes grillés" }, price: "8,00" },
    ],
  },
  {
    id: "tapas",
    title: d("Tapas", "Tapas", "Tapes", "Tapas", "تاپاس"),
    cover: "/images/croquetas.jpg",
    dishes: [
      { id: "pan-tomate", es: "Pan con tomate", fa: "نان با گوجه", name: { en: "Bread with tomato", ca: "Pa amb tomàquet", fr: "Pain à la tomate" }, price: "3,50", image: "/images/pan-tomate.jpg" },
      { id: "patatas-fritas", es: "Patatas fritas", fa: "سیب‌زمینی سرخ‌کرده", name: { en: "French fries", ca: "Patates fregides", fr: "Frites" }, price: "4,00", image: "/images/patatas-fritas.jpg" },
      { id: "padron", es: "Pimientos del Padrón", fa: "فلفل پادرون", name: { en: "Padrón peppers", ca: "Pebrots del Padró", fr: "Piments de Padrón" }, price: "5,90", image: "/images/padron.jpg" },
      { id: "bravas", es: "Patatas bravas", fa: "پاتاتاس براواس", name: { en: "Patatas bravas", ca: "Patates braves", fr: "Patatas bravas" }, price: "7,00", image: "/images/bravas.jpg" },
      { id: "croquetas", es: "Croquetas (4 u.)", fa: "کروکت", name: { en: "Croquettes (4 pcs)", ca: "Croquetes (4 u.)", fr: "Croquettes (4 pièces)" }, price: "8,00", image: "/images/croquetas.jpg",
        desc: d("Assorted, depending on the day.", "Variadas, según el día.", "Variades, segons el dia.", "Assorties, selon le jour.", "انواع مختلف، بسته به روز.") },
      { id: "champinones", es: "Champiñones salteados", fa: "قارچ تفت‌داده", name: { en: "Sautéed mushrooms", ca: "Xampinyons saltats", fr: "Champignons sautés" }, price: "8,50", image: "/images/champinones.jpg" },
      { id: "anchoas", es: "Anchoas con tostadas", fa: "آنچوی با نان تست", name: { en: "Anchovies with toast", ca: "Anxoves amb torrades", fr: "Anchois et toasts" }, price: "8,50" },
      { id: "alitas", es: "Alitas de pollo", fa: "بال مرغ", name: { en: "Chicken wings", ca: "Ales de pollastre", fr: "Ailes de poulet" }, price: "8,90", image: "/images/alitas.jpg",
        desc: d("Glazed, with sesame.", "Glaseadas, con sésamo.", "Glacejades, amb sèsam.", "Laquées, au sésame.", "لعاب‌دار، با کنجد.") },
      { id: "gyozas", es: "Gyozas (6 u.)", fa: "گیوزا", name: { en: "Gyozas (6 pcs)", ca: "Gyozes (6 u.)", fr: "Gyozas (6 pièces)" }, price: "11,00", image: "/images/gyozas.jpg",
        desc: d("With soy dipping sauce.", "Con salsa de soja para mojar.", "Amb salsa de soja per sucar.", "Avec sauce soja.", "با سس سویا.") },
      { id: "tabla-queso", es: "Tabla de queso", fa: "تخته پنیر", name: { en: "Cheese board", ca: "Taula de formatges", fr: "Plateau de fromages" }, price: "15,50", image: "/images/tabla-queso.jpg" },
      { id: "jamon", es: "Tabla de jamón ibérico", fa: "تخته ژامبون ایبریکو", name: { en: "Iberian ham board", ca: "Taula de pernil ibèric", fr: "Plateau de jambon ibérique" }, price: "17,00", image: "/images/jamon.jpg" },
      { id: "mini-burgers", es: "Tabla de mini hamburguesas", fa: "مینی همبرگر", name: { en: "Mini burger board", ca: "Taula de mini hamburgueses", fr: "Plateau de mini burgers" }, price: "20,50",
        desc: d("Three mini burgers in different flavours, with fries.", "Tres mini hamburguesas de sabores distintos, con patatas.", "Tres mini hamburgueses de gustos diferents, amb patates.", "Trois mini burgers aux saveurs différentes, avec frites.", "سه مینی همبرگر با طعم‌های مختلف، با سیب‌زمینی.") },
    ],
  },
  {
    id: "fish",
    title: d("Fish & Seafood", "Pescados", "Peix i marisc", "Poissons et fruits de mer", "ماهی و غذای دریایی"),
    cover: "/images/paella.jpg",
    dishes: [
      { id: "tartar-salmon", es: "Tartar de salmón con aguacate", fa: "تارتار سالمون با آووکادو", name: { en: "Salmon tartare with avocado", ca: "Tàrtar de salmó amb alvocat", fr: "Tartare de saumon à l'avocat" }, price: "15,90", image: "/images/tartar-salmon.jpg" },
      { id: "pescado-dia", es: "Pescado del día", fa: "ماهی روز", name: { en: "Fish of the day", ca: "Peix del dia", fr: "Poisson du jour" }, price: "17,50", image: "/images/pescado-dia.jpg",
        desc: d("With fries or salad.", "Con patatas o ensalada.", "Amb patates o amanida.", "Avec frites ou salade.", "با سیب‌زمینی یا سالاد.") },
      { id: "fish-chips", es: "Fish & chips", fa: "فیش اند چیپس", name: { en: "Fish and chips", ca: "Fish & chips", fr: "Fish & chips" }, price: "18,80", image: "/images/fish-chips.jpg",
        desc: d("With tartare sauce.", "Con salsa tártara.", "Amb salsa tàrtara.", "Avec sauce tartare.", "با سس تارتار.") },
      { id: "tartar-atun", es: "Tartar de atún fresco", fa: "تارتار تن ماهی تازه", name: { en: "Fresh tuna tartare", ca: "Tàrtar de tonyina fresca", fr: "Tartare de thon frais" }, price: "19,90" },
      { id: "gambones", es: "Gambones a la plancha", fa: "میگوی کبابی", name: { en: "Grilled king prawns", ca: "Gambots a la planxa", fr: "Gambas grillées" }, price: "26,90" },
      { id: "paella", es: "Paella de marisco", fa: "پائلای دریایی", name: { en: "Seafood paella", ca: "Paella de marisc", fr: "Paella aux fruits de mer" }, price: "16,00 / 28,90", image: "/images/paella.jpg",
        desc: d("For one or for two.", "Para uno o para dos.", "Per a un o per a dos.", "Pour une ou deux personnes.", "برای یک یا دو نفر.") },
    ],
  },
  {
    id: "meat",
    title: d("Meat", "Carnes", "Carns", "Viandes", "غذاهای گوشتی"),
    cover: "/images/solomillo.jpg",
    dishes: [
      { id: "pollo-azafran", es: "Pollo al azafrán con arroz", fa: "چلو مرغ زعفرانی", name: { en: "Saffron chicken with rice", ca: "Pollastre amb safrà i arròs", fr: "Poulet au safran et riz" }, price: "18,90", persian: true,
        desc: d("Chicken marinated in saffron, with Persian rice.", "Pollo marinado en azafrán, con arroz persa.", "Pollastre marinat amb safrà, amb arròs persa.", "Poulet mariné au safran, avec riz persan.", "مرغ مرینیت‌شده در زعفران، با برنج ایرانی.") },
      { id: "khoresh", es: "Guiso persa del día con arroz", fa: "خورش روز با برنج", name: { en: "Persian stew of the day", ca: "Guisat persa del dia amb arròs", fr: "Ragoût persan du jour" }, price: "17,50", persian: true,
        desc: d("Khoresh, slow cooked. Ask which one is on today.", "Khoresh a fuego lento. Pregunta cuál hay hoy.", "Khoresh a foc lent. Pregunta quin hi ha avui.", "Khoresh mijoté. Demandez celui du jour.", "خورش جاافتاده. بپرسید امروز کدام است.") },
      { id: "cordero", es: "Cordero aromático con arroz, 500 g", fa: "گوشت بره معطر با برنج", name: { en: "Aromatic lamb with rice, 500 g", ca: "Xai aromàtic amb arròs, 500 g", fr: "Agneau aromatique et riz, 500 g" }, price: "38,00", persian: true,
        desc: d("Lamb spiced the Persian way.", "Cordero especiado al estilo persa.", "Xai especiat a l'estil persa.", "Agneau épicé à la persane.", "گوشت بره با ادویه‌های ایرانی.") },
      { id: "pollo-catalana", es: "Pollo a la catalana", fa: "مرغ کاتالان", name: { en: "Catalan-style chicken", ca: "Pollastre a la catalana", fr: "Poulet à la catalane" }, price: "15,90", image: "/images/pollo-catalana.jpg",
        desc: d("Braised with dried fruit, served on mash.", "Guisado con frutos secos, sobre puré.", "Guisat amb fruita seca, sobre puré.", "Mijoté aux fruits secs, sur purée.", "خورشی با میوه‌ی خشک، روی پوره.") },
      { id: "lacon", es: "Lacón con patatas", fa: "لاکون با سیب‌زمینی", name: { en: "Cured pork shoulder with potatoes", ca: "Lacó amb patates", fr: "Épaule de porc et pommes de terre" }, price: "14,90" },
      { id: "steak-tartar", es: "Steak tartar sobre tuétano", fa: "استیک تارتار روی مغز استخوان", name: { en: "Steak tartare on bone marrow", ca: "Steak tàrtar sobre moll d'os", fr: "Steak tartare sur os à moelle" }, price: "25,00", image: "/images/steak-tartar.jpg" },
      { id: "hamburguesa", es: "Hamburguesa con patatas", fa: "همبرگر فیله با سیب‌زمینی", name: { en: "Sirloin burger with fries", ca: "Hamburguesa amb patates", fr: "Burger d'aloyau et frites" }, price: "19,50",
        desc: d("Premium sirloin beef.", "Carne de solomillo, calidad premium.", "Carn de filet, qualitat prèmium.", "Bœuf d'aloyau premium.", "گوشت فیله‌ی درجه‌یک.") },
      { id: "solomillo", es: "Solomillo salsa de pimienta", fa: "فیله گوساله با سس فلفل", name: { en: "Beef tenderloin, pepper sauce", ca: "Filet amb salsa de pebre", fr: "Filet de bœuf, sauce au poivre" }, price: "27,00", image: "/images/solomillo.jpg",
        desc: d("With fries or salad.", "Con patatas o ensalada.", "Amb patates o amanida.", "Avec frites ou salade.", "با سیب‌زمینی یا سالاد.") },
      { id: "chuleton", es: "Chuletón 520 g", fa: "استیک دنده", name: { en: "Rib steak, 520 g", ca: "Costella de bou, 520 g", fr: "Côte de bœuf, 520 g" }, price: "32,50", image: "/images/chuleton.jpg",
        desc: d("With fries or salad.", "Con patatas o ensalada.", "Amb patates o amanida.", "Avec frites ou salade.", "با سیب‌زمینی یا سالاد.") },
    ],
  },
  {
    id: "desserts",
    title: d("Desserts", "Postres", "Postres", "Desserts", "دسر"),
    cover: "/images/tabla-queso.jpg",
    dishes: [
      { id: "helado-persa", es: "Helado con sabores persas", fa: "بستنی سنتی", name: { en: "Persian ice cream", ca: "Gelat de sabors perses", fr: "Glace aux saveurs persanes" }, price: "6,50", persian: true,
        desc: d("Pistachio or saffron.", "Pistacho o azafrán.", "Festuc o safrà.", "Pistache ou safran.", "پسته یا زعفران.") },
      { id: "crema-catalana", es: "Crema catalana", fa: "کرم کاتالان", name: { en: "Crema catalana", ca: "Crema catalana", fr: "Crème catalane" }, price: "5,00" },
      { id: "tarta-queso", es: "Tarta de queso", fa: "چیزکیک", name: { en: "Cheesecake", ca: "Pastís de formatge", fr: "Cheesecake" }, price: "5,50" },
      { id: "mousse", es: "Mousse de chocolate", fa: "موس شکلات", name: { en: "Chocolate mousse", ca: "Mousse de xocolata", fr: "Mousse au chocolat" }, price: "6,50",
        desc: d("With nuts.", "Con frutos secos.", "Amb fruits secs.", "Aux fruits secs.", "با مغزها.") },
      { id: "bizcocho", es: "Bizcocho", fa: "کیک اسفنجی", name: { en: "Sponge cake", ca: "Pa de pessic", fr: "Génoise" }, price: "4,50",
        desc: d("With candied orange.", "Con naranja confitada.", "Amb taronja confitada.", "À l'orange confite.", "با پرتقال شکری.") },
    ],
  },
];

// Name to show in a given language: the menu (Spanish) name for es, the Farsi name for fa.
export const dishName = (dish: Dish, locale: Locale) => (locale === "es" ? dish.es : locale === "fa" ? dish.fa : dish.name[locale]);
// Second line under the main name, so staff and guests can always match it to the printed carta.
export const dishSubName = (dish: Dish, locale: Locale) => (locale === "es" ? dish.fa : dish.es);

// Text-only lists from the daytime café offer (names stay as printed on the menu).
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
