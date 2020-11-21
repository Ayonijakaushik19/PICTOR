# PICTOR - your picture editor

Live at - https://affectionate-cori-b0023c.netlify.app/

WORK IN PROGRESS

### A basic picture editor using fabric.js and nuxt.js

1. Add Text, Shapes
2. Upload Images
3. Change fill colour and border Colours
4. Adjust Transparency
5. Save Drawings in browser
6. Free Drawing
7. Download ability

Also added an image color extraction functionality.

### Using -

1. Nuxt.JS
2. Fabric.JS
3. Color-Thief
4. Vuetify

Implemented by default layouts and multiple pages for registration, new canvas and saved drawings.

<hr>

## Todos

- [x] Add vuex store
- [x] Add localstorage for current canvas
- [x] Add save drawing option
- [x] Make registration/login functional
- [x] Add more controls like ~~delete~~, ~~send front back~~, ~~polyline~~.
- [x] Add download ability
- [ ] Allow changing width and color of polyline
- [ ] Refine Vuetify element's functioning. Make sure to add all the elements mentioned in whatsapp thread.
- [ ] Add upload image in color extraction or use saved drawings
- [ ] Connect Registration to API and auth
- [ ] do not lose logged in info on refresh
<hr>

## Some Screenshots

![Drawing SS1](https://github.com/NandeeshG/PICTOR/blob/main/screenshots/ss_draw2.png?raw=true)

![Drawing SS2](https://github.com/NandeeshG/PICTOR/blob/main/screenshots/ss_draw.png?raw=true)

![ColorExtraction SS](https://github.com/NandeeshG/PICTOR/blob/main/screenshots/ss_colorExtraction.png?raw=true)

![Registration SS](https://github.com/NandeeshG/PICTOR/blob/main/screenshots/ss_reg.png?raw=true)

<hr>

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
