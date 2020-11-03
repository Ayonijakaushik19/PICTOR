# PICTOR - your picture editor

WORK IN PROGRESS

A basic picture editor using fabric.js and nuxt.js
1. Add Text, Shapes, Images
2. Change fill colour and border Colours
3. Adjust Transparency

Also a image color extraction functionality.

Using default layouts and multiple pages for registration, new canvas and saved drawings.
Registration page implements basic input field validation rules.

## Todos

1. Add more controls like delete, send front back, polyline.
2. Refine Vuetify element's functioning. Make sure to add all the elements mentioned in whatsapp thread.
3. Add vuex store
4. Add upload image in color extraction or use saved drawings
5. Add localstorage for current canvas
6. Add save drawing option
7. Make registration/login functional

![Drawing SS1](https://github.com/NandeeshG/PICTOR/blob/main/screenshots/ss_draw2.png?raw=true)
![Drawing SS2](https://github.com/NandeeshG/PICTOR/blob/main/screenshots/ss_draw.png?raw=true)
![Registration SS](https://github.com/NandeeshG/PICTOR/blob/main/screenshots/ss_reg.png?raw=true)

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
