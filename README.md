# Azafrán Pérsico website

The website for Azafrán Pérsico, a Persian and Mediterranean restaurant at Carrer de Girona 127, Barcelona.

It is a plain static site (HTML, CSS and a little JavaScript), so it can be hosted anywhere: GitHub Pages, Netlify, or the current hosting for azafranpersico.online. There is no build step.

## Adding photos

Every photo on the page has a fixed file name. Put a JPG with that name in the `img/` folder and it shows up on its own. Until then, a drawn saffron flower holds the place.

Use landscape or square photos at least 1600 px wide for the big slots, and at least 600 px for the dishes. Keep each file under about 400 KB (export at around 80% quality).

| File in `img/` | Where it appears |
| --- | --- |
| `azafran.jpg` | The big arch in the saffron section: your saffron threads, close up |
| `pollo-azafran.jpg`, `cordero.jpg`, `helado-persa.jpg` | Shown in the same arch when someone picks that dish |
| `khoresh.jpg`, `arroz-azafran.jpg`, `paella.jpg` | The three small pictures inside the opening sentence |
| `equipo.jpg` | Our story: the owner or the chef |
| `fachada.jpg`, `sala-1.jpg`, `sala-2.jpg`, `detalle.jpg`, `noche.jpg` | El local: the front, the dining room, a laid table, a detail, the room at night |
| One per dish, e.g. `croquetas.jpg`, `chuleton.jpg` | Beside each dish in the menu. The full list of names is in `tools/menu.mjs` (`photo:`) |

## Changing the menu

The menu lives in `tools/menu.mjs`. Edit a dish, its price or its description there, then run:

```
node tools/menu.mjs
```

That rewrites the menu inside `index.html`.

## Bookings

The booking form does not store anything. It opens WhatsApp with a message to 665 42 12 88, already filled in with the name, day, time and number of people. Mondays are blocked because the restaurant is closed.

## Languages

Spanish is in the HTML. Every English text sits next to it in a `data-en` attribute, and the EN button swaps them.
