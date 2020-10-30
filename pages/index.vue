<template>
  <v-app class="white">
    <v-container>
      <v-row justify="center">
        <v-col sm="9">
          <canvas
            id="canvas"
            :width="maxWidth"
            :height="maxHeight"
            style="border: 1px solid black"
          ></canvas>
        </v-col>
      </v-row>
    </v-container>

    <v-footer class="black" app height="60">
      <v-spacer />
      <v-overflow-btn
        :items="shapes"
        label="Shape"
        dense
        segmented
        class="ma-1"
      >
      </v-overflow-btn>
      <v-overflow-btn
        v-model="selectedColor"
        class="ma-1"
        :items="colors"
        label="Color"
        overflow
        dense
      >
      </v-overflow-btn>
      <v-file-input
        v-model="userImage"
        accept="image/*"
        prepend-icon="mdi-camera"
        hide-input
        dense
        @change="addImage"
      />
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import { fabric } from 'fabric'
export default {
  data() {
    return {
      userImage: {},
      maxWidth: 640,
      maxHeight: 480,
      justify: ['start', 'center', 'end', 'space-around', 'space-between'],
      canvas: {},
      shapes: [
        { text: 'Add Rectangle', callback: () => this.addShape('rectangle') },
        { text: 'Add Circle', callback: () => this.addShape('circle') },
        { text: 'Add Ellipse', callback: () => this.addShape('ellipse') },
        { text: 'Add Triangle', callback: () => this.addShape('triangle') },
        { text: 'Add Line', callback: () => this.addShape('line') },
      ],
      colors: [
        {
          text: 'Red',
          value: 'red',
        },
        {
          text: 'Blue',
          value: 'rgb(0,190,255)',
        },
        {
          text: 'Green',
          value: 'green',
        },
        {
          text: 'Black',
          value: 'black',
        },
      ],
      selectedColor: 'black',
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas')
  },
  methods: {
    addImage() {
      const reader = new FileReader()
      const mycanvas = this.canvas
      reader.readAsDataURL(this.userImage)
      reader.onload = function (f) {
        const data = f.target.result
        // eslint-disable-next-line new-cap
        fabric.Image.fromURL(data, function (img) {
          const oImg = img.set({
            left: 10,
            top: 10,
          })
          mycanvas.add(oImg)
        })
      }
    },
    addShape(val) {
      let shape = {}
      if (val === 'rectangle') {
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          top: 20,
          left: 30,
          fill: this.selectedColor,
        })
      } else if (val === 'circle') {
        shape = new fabric.Circle({
          top: 20,
          left: 30,
          radius: 30,
          fill: this.selectedColor,
        })
      } else if (val === 'ellipse') {
        shape = new fabric.Ellipse({
          top: 20,
          left: 30,
          rx: 40,
          ry: 20,
          fill: this.selectedColor,
        })
      } else if (val === 'triangle') {
        shape = new fabric.Triangle({
          top: 20,
          left: 30,
          height: 40,
          width: 80,
          fill: this.selectedColor,
        })
      } else if (val === 'line') {
        shape = new fabric.Line([10, 10, 100, 10], {
          stroke: this.selectedColor,
          strokeWidth: 10,
        })
      }
      this.canvas.add(shape)
    },
  },
}
</script>

<style></style>
