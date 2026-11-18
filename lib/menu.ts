import type { Locale } from "./i18n/config";

// The carta shown on the site. Prices in euros, VAT included.
// Every name and description exists in each site language, so a page only ever shows one language.
// Have the kitchen check the translations before launch.

type T = Record<Locale, string>;

export type Dish = {
  id: string;
  name: T;
  desc?: T;
  price?: string; // left out while unconfirmed: the site shows "Ask us"
  image?: string; // file in /public/images
};

export type MenuSection = { id: string; title: T; cover: string; dishes: Dish[] };
export type PriceItem = { name: T; price: string };

// Order: English, Spanish, Catalan, French, Persian.
const d = (en: string, es: string, ca: string, fr: string, fa: string): T => ({ en, es, ca, fr, fa });

export const menu: MenuSection[] = [
  {
    id: "starters",
    title: d("Starters", "Entrantes", "Entrants", "Entrées", "پیش‌غذا"),
    cover: "/images/ensalada-verde.jpg",
    dishes: [
      { id: "ensalada-verde", name: d("Green salad", "Ensalada verde", "Amanida verda", "Salade verte", "سالاد سبز"), price: "8,50", image: "/images/ensalada-verde.jpg",
        desc: d("Mixed leaves, avocado, egg, carrot and tomato.", "Mezclum, aguacate, huevo, zanahoria y tomate.", "Mesclum, alvocat, ou, pastanaga i tomàquet.", "Mesclun, avocat, œuf, carotte et tomate.", "کاهوی مخلوط، آووکادو، تخم‌مرغ، هویج و گوجه.") },
      { id: "tomate-mozzarella", name: d("Tomato and mozzarella salad", "Ensalada de tomate y mozzarella", "Amanida de tomàquet i mozzarella", "Salade tomate mozzarella", "سالاد گوجه و موتزارلا"), price: "10,00", image: "/images/tomate-mozzarella.jpg" },
      { id: "queso-cabra", name: d("Goat cheese salad", "Ensalada con queso de cabra", "Amanida amb formatge de cabra", "Salade au chèvre", "سالاد پنیر بز"), price: "10,00", image: "/images/queso-cabra.jpg",
        desc: d("With walnuts.", "Con nueces.", "Amb nous.", "Aux noix.", "با گردو.") },
      { id: "verduras", name: d("Grilled vegetables", "Verduras a la plancha", "Verdures a la planxa", "Légumes grillés", "سبزیجات کبابی"), price: "8,00" },
    ],
  },
  {
    id: "tapas",
    title: d("Tapas", "Tapas", "Tapes", "Tapas", "تاپاس"),
    cover: "/images/croquetas.jpg",
    dishes: [
      { id: "pan-tomate", name: d("Bread with tomato", "Pan con tomate", "Pa amb tomàquet", "Pain à la tomate", "نان با گوجه"), price: "3,50", image: "/images/pan-tomate.jpg" },
      { id: "patatas-fritas", name: d("French fries", "Patatas fritas", "Patates fregides", "Frites", "سیب‌زمینی سرخ‌کرده"), price: "4,00", image: "/images/patatas-fritas.jpg" },
      { id: "padron", name: d("Padrón peppers", "Pimientos del Padrón", "Pebrots del Padró", "Piments de Padrón", "فلفل پادرون"), price: "5,90", image: "/images/padron.jpg" },
      { id: "bravas", name: d("Patatas bravas", "Patatas bravas", "Patates braves", "Patatas bravas", "پاتاتاس براواس"), price: "7,00", image: "/images/bravas.jpg" },
      { id: "croquetas", name: d("Croquettes (4 pcs)", "Croquetas (4 u.)", "Croquetes (4 u.)", "Croquettes (4 pièces)", "کروکت"), price: "8,00", image: "/images/croquetas.jpg",
        desc: d("Assorted, depending on the day.", "Variadas, según el día.", "Variades, segons el dia.", "Assorties, selon le jour.", "انواع مختلف، بسته به روز.") },
      { id: "champinones", name: d("Sautéed mushrooms", "Champiñones salteados", "Xampinyons saltats", "Champignons sautés", "قارچ تفت‌داده"), price: "8,50", image: "/images/champinones.jpg" },
      { id: "anchoas", name: d("Anchovies with toast", "Anchoas con tostadas", "Anxoves amb torrades", "Anchois et toasts", "آنچوی با نان تست"), price: "8,50" },
      { id: "alitas", name: d("Chicken wings", "Alitas de pollo", "Ales de pollastre", "Ailes de poulet", "بال مرغ"), price: "8,90", image: "/images/alitas.jpg",
        desc: d("Glazed, with sesame.", "Glaseadas, con sésamo.", "Glacejades, amb sèsam.", "Laquées, au sésame.", "لعاب‌دار، با کنجد.") },
      { id: "gyozas", name: d("Gyozas (6 pcs)", "Gyozas (6 u.)", "Gyozes (6 u.)", "Gyozas (6 pièces)", "گیوزا"), price: "11,00", image: "/images/gyozas.jpg",
        desc: d("With soy dipping sauce.", "Con salsa de soja para mojar.", "Amb salsa de soja per sucar.", "Avec sauce soja.", "با سس سویا.") },
      { id: "tabla-queso", name: d("Cheese board", "Tabla de queso", "Taula de formatges", "Plateau de fromages", "تخته پنیر"), price: "15,50", image: "/images/tabla-queso.jpg" },
      { id: "jamon", name: d("Iberian ham board", "Tabla de jamón ibérico", "Taula de pernil ibèric", "Plateau de jambon ibérique", "تخته ژامبون ایبریکو"), price: "17,00", image: "/images/jamon.jpg" },
      { id: "mini-burgers", name: d("Mini burger board", "Tabla de mini hamburguesas", "Taula de mini hamburgueses", "Plateau de mini burgers", "مینی همبرگر"), price: "20,50",
        desc: d("Three mini burgers in different flavours, with fries.", "Tres mini hamburguesas de sabores distintos, con patatas.", "Tres mini hamburgueses de gustos diferents, amb patates.", "Trois mini burgers aux saveurs différentes, avec frites.", "سه مینی همبرگر با طعم‌های مختلف، با سیب‌زمینی.") },
    ],
  },
  {
    id: "fish",
    title: d("Fish & Seafood", "Pescados", "Peix i marisc", "Poissons et fruits de mer", "ماهی و غذای دریایی"),
    cover: "/images/paella.jpg",
    dishes: [
      { id: "tartar-salmon", name: d("Salmon tartare with avocado", "Tartar de salmón con aguacate", "Tàrtar de salmó amb alvocat", "Tartare de saumon à l'avocat", "تارتار سالمون با آووکادو"), price: "15,90", image: "/images/tartar-salmon.jpg" },
      { id: "pescado-dia", name: d("Fish of the day", "Pescado del día", "Peix del dia", "Poisson du jour", "ماهی روز"), price: "17,50", image: "/images/pescado-dia.jpg",
        desc: d("With fries or salad.", "Con patatas o ensalada.", "Amb patates o amanida.", "Avec frites ou salade.", "با سیب‌زمینی یا سالاد.") },
      { id: "fish-chips", name: d("Fish and chips", "Fish & chips", "Fish & chips", "Fish & chips", "فیش اند چیپس"), price: "18,80", image: "/images/fish-chips.jpg",
        desc: d("With tartare sauce.", "Con salsa tártara.", "Amb salsa tàrtara.", "Avec sauce tartare.", "با سس تارتار.") },
      { id: "tartar-atun", name: d("Fresh tuna tartare", "Tartar de atún fresco", "Tàrtar de tonyina fresca", "Tartare de thon frais", "تارتار تن ماهی تازه"), price: "19,90" },
      { id: "gambones", name: d("Grilled king prawns", "Gambones a la plancha", "Gambots a la planxa", "Gambas grillées", "میگوی کبابی"), price: "26,90" },
      { id: "paella", name: d("Seafood paella", "Paella de marisco", "Paella de marisc", "Paella aux fruits de mer", "پائلای دریایی"), price: "16,00 / 28,90", image: "/images/paella.jpg",
        desc: d("For one or for two.", "Para uno o para dos.", "Per a un o per a dos.", "Pour une ou deux personnes.", "برای یک یا دو نفر.") },
    ],
  },
  {
    id: "meat",
    title: d("Meat", "Carnes", "Carns", "Viandes", "غذاهای گوشتی"),
    cover: "/images/solomillo.jpg",
    dishes: [
      { id: "pollo-catalana", name: d("Catalan-style chicken", "Pollo a la catalana", "Pollastre a la catalana", "Poulet à la catalane", "مرغ کاتالان"), price: "15,90", image: "/images/pollo-catalana.jpg",
        desc: d("Braised with dried fruit, served on mash.", "Guisado con frutos secos, sobre puré.", "Guisat amb fruita seca, sobre puré.", "Mijoté aux fruits secs, sur purée.", "خورشی با میوه‌ی خشک، روی پوره.") },
      { id: "lacon", name: d("Cured pork shoulder with potatoes", "Lacón con patatas", "Lacó amb patates", "Épaule de porc et pommes de terre", "لاکون با سیب‌زمینی"), price: "14,90" },
      { id: "steak-tartar", name: d("Steak tartare on bone marrow", "Steak tartar sobre tuétano", "Steak tàrtar sobre moll d'os", "Steak tartare sur os à moelle", "استیک تارتار روی مغز استخوان"), price: "25,00", image: "/images/steak-tartar.jpg" },
      { id: "hamburguesa", name: d("Sirloin burger with fries", "Hamburguesa con patatas", "Hamburguesa amb patates", "Burger d'aloyau et frites", "همبرگر فیله با سیب‌زمینی"), price: "19,50",
        desc: d("Premium sirloin beef.", "Carne de solomillo, calidad premium.", "Carn de filet, qualitat prèmium.", "Bœuf d'aloyau premium.", "گوشت فیله‌ی درجه‌یک.") },
      { id: "solomillo", name: d("Beef tenderloin, pepper sauce", "Solomillo salsa de pimienta", "Filet amb salsa de pebre", "Filet de bœuf, sauce au poivre", "فیله گوساله با سس فلفل"), price: "27,00", image: "/images/solomillo.jpg",
        desc: d("With fries or salad.", "Con patatas o ensalada.", "Amb patates o amanida.", "Avec frites ou salade.", "با سیب‌زمینی یا سالاد.") },
      { id: "chuleton", name: d("Rib steak, 520 g", "Chuletón 520 g", "Costella de bou, 520 g", "Côte de bœuf, 520 g", "استیک دنده"), price: "32,50", image: "/images/chuleton.jpg",
        desc: d("With fries or salad.", "Con patatas o ensalada.", "Amb patates o amanida.", "Avec frites ou salade.", "با سیب‌زمینی یا سالاد.") },
    ],
  },
];

// Daytime café offer.
export const cafe: Record<"coffee" | "bocadillos" | "bolleria", PriceItem[]> = {
  coffee: [
    { name: d("Coffee with milk", "Café con leche", "Cafè amb llet", "Café au lait", "قهوه با شیر"), price: "1,90" },
    { name: d("Cortado", "Cortado", "Tallat", "Noisette", "کورتادو"), price: "1,70" },
    { name: d("Americano", "Americano", "Americà", "Café allongé", "آمریکانو"), price: "1,70" },
    { name: d("Tea: berries, chamomile, black, red or green", "Té: frutos del bosque, manzanilla, negro, rojo o verde", "Te: fruits del bosc, camamilla, negre, vermell o verd", "Thé : fruits rouges, camomille, noir, rouge ou vert", "چای: میوه‌های جنگلی، بابونه، سیاه، قرمز یا سبز"), price: "2,50" },
    { name: d("Pot of tea", "Té en tetera", "Te en tetera", "Théière", "قوری چای"), price: "4,00" },
  ],
  bocadillos: [
    { name: d("Plain omelette", "Tortilla francesa", "Truita francesa", "Omelette nature", "املت ساده"), price: "3,50 / 2,50" },
    { name: d("Cheese omelette", "Tortilla francesa con queso", "Truita francesa amb formatge", "Omelette au fromage", "املت با پنیر"), price: "4,50 / 3,50" },
    { name: d("Fuet (Catalan dry sausage)", "Fuet", "Fuet", "Fuet (saucisson catalan)", "فوئت (سوسیس خشک کاتالان)"), price: "3,50 / 2,50" },
    { name: d("Cheese", "Queso", "Formatge", "Fromage", "پنیر"), price: "4,50 / 3,50" },
    { name: d("Tuna", "Atún", "Tonyina", "Thon", "تن ماهی"), price: "4,00 / 3,00" },
    { name: d("Toasted ham and cheese", "Bikini", "Biquini", "Croque-monsieur", "ساندویچ تست ژامبون و پنیر"), price: "3,50" },
    { name: d("Filled croissant", "Croissant relleno", "Croissant farcit", "Croissant garni", "کروسان پرشده"), price: "4,25" },
    { name: d("Iberian ham", "Jamón ibérico", "Pernil ibèric", "Jambon ibérique", "ژامبون ایبریکو"), price: "7,50 / 5,50" },
    { name: d("Serrano ham", "Jamón serrano", "Pernil serrà", "Jambon serrano", "ژامبون سرانو"), price: "4,50 / 3,50" },
    { name: d("Iberian chorizo", "Chorizo ibérico", "Xoriço ibèric", "Chorizo ibérique", "چوریزو ایبریکو"), price: "5,50 / 4,50" },
    { name: d("Vegetable", "Vegetal", "Vegetal", "Crudités", "سبزیجات"), price: "5,50 / 4,50" },
    { name: d("Bacon and cheese", "Bacon con queso", "Bacó amb formatge", "Bacon et fromage", "بیکن و پنیر"), price: "3,95 / 2,50" },
    { name: d("Toast with butter and jam", "Tostada con mantequilla y mermelada", "Torrada amb mantega i melmelada", "Tartine beurre et confiture", "نان تست با کره و مربا"), price: "2,70" },
    { name: d("Toast with tomato", "Tostada con tomate", "Torrada amb tomàquet", "Tartine à la tomate", "نان تست با گوجه"), price: "2,70" },
  ],
  bolleria: [
    { name: d("Croissant", "Croissant", "Croissant", "Croissant", "کروسان"), price: "1,20" },
    { name: d("Argentine croissant", "Croissant argentino", "Croissant argentí", "Croissant argentin", "کروسان آرژانتینی"), price: "1,10" },
    { name: d("Custard pastry", "Napolitana de crema", "Napolitana de crema", "Feuilleté à la crème", "شیرینی کرم‌دار"), price: "1,30" },
    { name: d("Multigrain palmier", "Palmera multicereal", "Palmera multicereal", "Palmier multicéréales", "شیرینی پروانه‌ای چندغله"), price: "1,20" },
  ],
};
