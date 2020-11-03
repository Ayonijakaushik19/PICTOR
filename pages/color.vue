<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <img
            id="myimg"
            :src="source"
            height="400"
            width="500"
            crossorigin="anonymous"
          />
        </v-col>
        <v-col cols="12" sm="4" align-self="center">
          <v-row>
            <v-btn @click="reload"> NEW PICTURE </v-btn>
          </v-row>
          <v-row>
            <h1>PRIMARY COLOR</h1>
            <v-btn :color="primary" block @click="copyColor(primary)">{{
              primary
            }}</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <h1>COLOR PALLETE</h1>
      <div v-for="(c, id) in colors" :key="id">
        <v-btn :color="c.color" block @click="copyColor(c.color)">{{
          c.color
        }}</v-btn>
      </div>
    </v-container>
    <v-snackbar
      v-model="successChip"
      timeout="1000"
      bottom
      left
      rounded="r-xl"
      transition="slide-x-transition"
      color="blue"
    >
      Copied {{ successChipText }}
    </v-snackbar>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs'
export default {
  data() {
    return {
      colors: [],
      source: 'https://picsum.photos/400',
      primary: '',
      successChip: false,
      successChipText: '',
    }
  },
  mounted() {
    this.ct_func()
  },
  methods: {
    async ct_func() {
      const colorThief = new ColorThief()
      const img = document.querySelector('#myimg')
      await this.loadImage(this.source, img)

      this.primary = colorThief.getColor(img)
      this.colors = colorThief.getPalette(img)

      for (let i = 0; i < this.colors.length; ++i) {
        this.colors[i].value = this.colors[i]
        this.colors[i].color = this.rgbToHex(
          this.colors[i].value[0],
          this.colors[i].value[1],
          this.colors[i].value[2]
        )
      }
      this.primary = this.rgbToHex(
        this.primary[0],
        this.primary[1],
        this.primary[1]
      )
    },
    loadImage(url, elem) {
      return new Promise((resolve, reject) => {
        elem.onload = () => resolve(elem)
        elem.onerror = reject
        elem.src = url
      })
    },
    reload() {
      window.location.reload()
    },
    rgbToHex(r, g, b) {
      return (
        '#' +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
          })
          .join('')
      )
    },
    copyColor(val) {
      navigator.clipboard
        .writeText(val)
        .then(() => {
          this.successChip = true
          this.successChipText = val
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>

<style></style>
