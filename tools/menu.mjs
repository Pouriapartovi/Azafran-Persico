// Builds the Carta section of index.html from the menu below.
// Edit a dish here, then run:  node tools/menu.mjs
// Persian dishes have p: true. A photo is picked up from img/<photo>.jpg when it exists.
import { readFileSync, writeFileSync } from 'node:fs';

const menu = [
  {
    id: 'entrantes', es: 'Entrantes', en: 'Starters',
    items: [
      { p: true, photo: 'olivieh', es: 'Ensalada rusa estilo persa', en: 'Persian Olivier salad', price: '7,00', des: 'Olivieh, la ensaladilla de patata al estilo persa, con tostadas.', den: 'Olivieh, potato salad the Persian way, with toasts.' },
      { p: true, photo: 'kashk-bademjan', es: 'Crema de berenjena estilo persa', en: 'Persian aubergine dip', price: '9,50', des: 'Kashk-e bademjan: berenjena ahumada con kashk y nueces, con tostadas.', den: 'Kashk-e bademjan: smoky aubergine with kashk and walnuts, with toasts.' },
      { photo: 'ensalada-verde', es: 'Ensalada verde', en: 'Green salad', price: '8,50', des: 'Mezclum, aguacate, huevo, zanahoria y tomate.', den: 'Mixed leaves, avocado, egg, carrot and tomato.' },
      { photo: 'tomate-mozzarella', es: 'Tomate y mozzarella', en: 'Tomato and mozzarella', price: '10,00', des: 'Tomate maduro, mozzarella y aceite de oliva.', den: 'Ripe tomato, mozzarella and olive oil.' },
      { photo: 'queso-cabra', es: 'Ensalada de queso de cabra', en: 'Goat cheese salad', price: '10,00', des: 'Con nueces.', den: 'With walnuts.' },
      { photo: 'verduras', es: 'Verduras a la plancha', en: 'Grilled vegetables', price: '8,00', des: 'Verduras de temporada a la plancha.', den: 'Seasonal vegetables from the griddle.' },
    ],
  },
  {
    id: 'tapas', es: 'Tapas', en: 'Tapas',
    items: [
      { photo: 'pan-tomate', es: 'Pan con tomate', en: 'Bread with tomato', price: '3,50' },
      { photo: 'patatas-fritas', es: 'Patatas fritas', en: 'French fries', price: '4,00' },
      { photo: 'padron', es: 'Pimientos del Padrón', en: 'Padrón peppers', price: '5,90' },
      { photo: 'bravas', es: 'Patatas bravas', en: 'Patatas bravas', price: '7,00' },
      { photo: 'croquetas', es: 'Croquetas, 4 u.', en: 'Croquettes, 4 pcs', price: '8,00', des: 'Variadas, según el día.', den: 'Assorted, depending on the day.' },
      { photo: 'champinones', es: 'Champiñones salteados', en: 'Sautéed mushrooms', price: '8,50' },
      { photo: 'anchoas', es: 'Anchoas con tostadas', en: 'Anchovies with toast', price: '8,50' },
      { photo: 'alitas', es: 'Alitas de pollo', en: 'Chicken wings', price: '8,90', des: 'Glaseadas, con sésamo.', den: 'Glazed, with sesame.' },
      { photo: 'gyozas', es: 'Gyozas, 6 u.', en: 'Gyozas, 6 pcs', price: '11,00', des: 'Con salsa de soja para mojar.', den: 'With soy dipping sauce.' },
      { photo: 'tabla-queso', es: 'Tabla de quesos', en: 'Cheese board', price: '15,50' },
      { photo: 'jamon', es: 'Tabla de jamón ibérico', en: 'Iberian ham board', price: '17,00' },
      { photo: 'mini-burgers', es: 'Tabla de mini hamburguesas', en: 'Mini burger board', price: '20,50', des: 'Tres sabores distintos, con patatas.', den: 'Three different flavours, with fries.' },
    ],
  },
  {
    id: 'pescados', es: 'Pescados', en: 'Fish and seafood',
    items: [
      { photo: 'tartar-salmon', es: 'Tartar de salmón con aguacate', en: 'Salmon tartare with avocado', price: '15,90', des: 'Salmón fresco y aguacate.', den: 'Fresh salmon and avocado.' },
      { photo: 'pescado-dia', es: 'Pescado del día', en: 'Fish of the day', price: '17,50', des: 'Con patatas o ensalada.', den: 'With fries or salad.' },
      { photo: 'fish-chips', es: 'Fish and chips', en: 'Fish and chips', price: '18,80', des: 'Con salsa tártara.', den: 'With tartare sauce.' },
      { photo: 'tartar-atun', es: 'Tartar de atún fresco', en: 'Fresh tuna tartare', price: '19,90', des: 'Atún fresco cortado a cuchillo.', den: 'Fresh tuna, hand-cut.' },
      { photo: 'gambones', es: 'Gambones a la plancha', en: 'Grilled king prawns', price: '26,90', des: 'A la plancha.', den: 'From the griddle.' },
      { photo: 'paella', es: 'Paella de marisco', en: 'Seafood paella', price: '16,00 / 28,90', des: 'Para una persona o para dos.', den: 'For one or for two.' },
    ],
  },
  {
    id: 'carnes', es: 'Carnes', en: 'Meat',
    items: [
      { p: true, photo: 'kebab-mixto', es: 'Pincho de carne y pollo con azafrán', en: 'Beef and saffron chicken kebab', price: '32,50', des: 'Con arroz persa, tomate y pimiento asados.', den: 'With Persian rice, grilled tomato and pepper.' },
      { p: true, photo: 'kubideh', es: 'Kebab koobideh', en: 'Kebab koobideh', des: 'Dos pinchos de carne picada, con arroz persa.', den: 'Two skewers of minced meat, with Persian rice.' },
      { p: true, photo: 'kebab-barg', es: 'Pincho de carne con arroz', en: 'Beef kebab with rice', price: '27,00', des: 'Con arroz persa al azafrán y rúcula.', den: 'With saffron Persian rice and rocket.' },
      { p: true, photo: 'joojeh', es: 'Pincho de pollo con azafrán', en: 'Saffron chicken kebab' },
      { p: true, photo: 'pollo-azafran', es: 'Pollo al azafrán con arroz', en: 'Saffron chicken with rice', price: '18,90', des: 'Pollo marinado en azafrán, con arroz persa.', den: 'Chicken marinated in saffron, with Persian rice.' },
      { p: true, photo: 'khoresh', es: 'Guiso persa del día con arroz', en: 'Persian stew of the day', price: '17,50', des: 'Khoresh hecho a fuego lento. Pregunta cuál toca hoy.', den: 'A slow-cooked khoresh. Ask which one is on today.' },
      { p: true, photo: 'cordero', es: 'Cordero aromático con arroz, 500 g', en: 'Aromatic lamb with rice, 500 g', price: '38,00', des: 'Cordero especiado al estilo persa.', den: 'Lamb spiced the Persian way.' },
      { photo: 'pollo-catalana', es: 'Pollo a la catalana', en: 'Catalan-style chicken', price: '15,90', des: 'Guisado con frutos secos, sobre puré.', den: 'Braised with dried fruit, served on mash.' },
      { photo: 'lacon', es: 'Lacón con patatas', en: 'Cured pork shoulder with potatoes', price: '14,90' },
      { photo: 'hamburguesa', es: 'Hamburguesa de solomillo', en: 'Sirloin burger', price: '19,50', des: 'Carne de solomillo, con patatas.', den: 'Sirloin beef, with fries.' },
      { photo: 'steak-tartar', es: 'Steak tartar sobre tuétano', en: 'Steak tartare on bone marrow', price: '25,00', des: 'Tartar de ternera sobre tuétano asado.', den: 'Beef tartare on roasted bone marrow.' },
      { photo: 'solomillo', es: 'Solomillo a la pimienta', en: 'Beef tenderloin, pepper sauce', price: '27,00', des: 'Con patatas o ensalada.', den: 'With fries or salad.' },
      { photo: 'chuleton', es: 'Chuletón, 520 g', en: 'Rib steak, 520 g', price: '32,50', des: 'Con patatas o ensalada.', den: 'With fries or salad.' },
    ],
  },
  {
    id: 'postres', es: 'Postres', en: 'Desserts',
    items: [
      { p: true, photo: 'helado-persa', es: 'Helado persa', en: 'Persian ice cream', price: '6,50', des: 'De pistacho o de azafrán.', den: 'Pistachio or saffron.' },
      { photo: 'crema-catalana', es: 'Crema catalana', en: 'Crema catalana', price: '5,00', des: 'Crema con azúcar caramelizado.', den: 'Custard with caramelised sugar.' },
      { photo: 'tarta-queso', es: 'Tarta de queso', en: 'Cheesecake', price: '5,50', des: 'Tarta de queso casera.', den: 'Homemade cheesecake.' },
      { photo: 'mousse', es: 'Mousse de chocolate', en: 'Chocolate mousse', price: '6,50', des: 'Con frutos secos.', den: 'With nuts.' },
      { photo: 'bizcocho', es: 'Bizcocho', en: 'Sponge cake', price: '4,50', des: 'Con naranja confitada.', den: 'With candied orange.' },
    ],
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const attr = (en) => (en ? ` data-en="${esc(en)}"` : '');

const dish = (d) => `
          <article class="card${d.p ? ' is-persian' : ''}">
            <div class="card-pic">
              <svg class="flor" aria-hidden="true"><use href="#flor"/></svg>
              <img src="img/${d.photo}.jpg" alt="${esc(d.es)}" width="640" height="480" loading="lazy" onerror="this.remove()">${d.p ? `
              <span class="badge" data-en="Persian recipe">Receta persa</span>` : ''}
            </div>
            <div class="card-body">
              <h4 class="card-name"${attr(d.en)}>${esc(d.es)}</h4>${d.des ? `
              <p class="card-desc"${attr(d.den)}>${esc(d.des)}</p>` : ''}
              <p class="price">${d.price ? `${d.price} €` : '<span data-en="Ask our team">Consultar en sala</span>'}</p>
            </div>
          </article>`;

const html = menu.map((c) => `
      <div class="course" id="carta-${c.id}" data-course>
        <h3 class="course-title"${attr(c.en)}>${c.es}</h3>
        <div class="cards">${c.items.map(dish).join('')}
        </div>
      </div>`).join('\n');

const nav = menu.map((c, i) => `<button class="tab" type="button" role="tab" aria-selected="${i === 0}" data-tab="carta-${c.id}"${attr(c.en)}>${c.es}</button>`).join('\n          ');

const file = new URL('../index.html', import.meta.url);
let page = readFileSync(file, 'utf8');
page = page.replace(/<!-- menu:start -->[\s\S]*?<!-- menu:end -->/, `<!-- menu:start -->${html}\n      <!-- menu:end -->`);
page = page.replace(/<!-- menunav:start -->[\s\S]*?<!-- menunav:end -->/, `<!-- menunav:start -->\n          ${nav}\n          <!-- menunav:end -->`);
writeFileSync(file, page);
console.log(`Carta written: ${menu.reduce((n, c) => n + c.items.length, 0)} dishes in ${menu.length} courses.`);
