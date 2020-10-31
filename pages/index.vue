<template>
  <v-app class="white">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <canvas
            id="canvas"
            :width="maxWidth"
            :height="maxHeight"
            style="border: 1px solid black"
          ></canvas>
        </v-col>
        <v-col cols="2">
          <v-row>
            <v-slider
              v-model="selection.angle"
              track-color="grey"
              label="Angle"
              light
              color="black"
              :disabled="selection.disableControls"
              thumb-label
              :max="360"
              @mouseup="objEdited"
            ></v-slider>
          </v-row>
          <v-row>
            <v-slider
              v-model="selection.bWidth"
              track-color="grey"
              label="Border"
              light
              color="black"
              :disabled="selection.disableControls"
              thumb-label
              :max="10"
              :min="0"
              :step="1"
              @mouseup="objEdited"
            ></v-slider>
          </v-row>
          <v-row>
            <v-overflow-btn
              v-model="selection.colorIn"
              :items="selection.colorInOptions"
              label="Color In?"
              dense
              light
              :disabled="selection.disableControls"
            >
            </v-overflow-btn>
          </v-row>
          <v-row>
            <v-slider
              v-model="selection.colorR"
              track-color="grey"
              label="Red"
              light
              :max="255"
              color="red"
              :disabled="selection.disableControls"
              thumb-label
              @mouseup="objEdited"
            ></v-slider>
          </v-row>
          <v-row>
            <v-slider
              v-model="selection.colorG"
              track-color="grey"
              label="Green"
              light
              :max="255"
              color="green"
              :disabled="selection.disableControls"
              thumb-label
              @mouseup="objEdited"
            ></v-slider>
          </v-row>
          <v-row>
            <v-slider
              v-model="selection.colorB"
              track-color="grey"
              label="Blue"
              light
              :max="255"
              color="blue"
              :disabled="selection.disableControls"
              thumb-label
              @mouseup="objEdited"
            ></v-slider>
          </v-row>
          <v-row>
            <v-slider
              v-model="selection.opacity"
              track-color="grey"
              label="Opacity"
              light
              color="black"
              :disabled="selection.disableControls"
              thumb-label
              :min="0.0"
              :max="1.0"
              :step="0.1"
              @mouseup="objEdited"
            ></v-slider>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-footer class="black" app height="60">
      <span class="text-sm-h5 mb-5"> ADD - </span>
      <v-spacer />
      <v-text-field
        v-model="userText"
        rounded
        outlined
        label="Enter text"
        dense
        flat
        class="ma-0 pa-0"
        @change="addText"
      >
      </v-text-field>
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
        class="mb-6 ml-2"
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
      userText: '',
      userImage: {},
      maxWidth: 640,
      maxHeight: 480,
      justify: ['start', 'center', 'end', 'space-around', 'space-between'],
      canvas: {},
      shapes: [
        { text: 'Rectangle', callback: () => this.addShape('rectangle') },
        { text: 'Circle', callback: () => this.addShape('circle') },
        { text: 'Ellipse', callback: () => this.addShape('ellipse') },
        { text: 'Triangle', callback: () => this.addShape('triangle') },
        { text: 'Line', callback: () => this.addShape('line') },
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
      selection: {
        angle: '',
        bWidth: '',
        colorIn: 'Fill',
        colorInOptions: ['Fill', 'Border'],
        colorR: '',
        colorG: '',
        colorB: '',
        opacity: '',
        disableControls: true,
        selectedObj: {},
      },
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas')
  },
  methods: {
    addText() {
      const text = new fabric.Text(this.userText, {
        left: 20,
        right: 20,
        fontFamily: 'Hoefler Text',
      })
      const myhandler = this.objSelected
      text.on('selected', function () {
        myhandler(true, text)
      })
      text.on('deselected', function () {
        myhandler(false, text)
      })
      this.canvas.add(text)
    },
    addImage() {
      const reader = new FileReader()
      const mycanvas = this.canvas
      reader.readAsDataURL(this.userImage)
      const myhandler = this.objSelected
      reader.onload = function (f) {
        const data = f.target.result
        // eslint-disable-next-line new-cap
        fabric.Image.fromURL(data, function (img) {
          const oImg = img.set({
            left: 10,
            top: 10,
            scaleX: 0.35,
            scaleY: 0.35,
          })
          oImg.on('selected', function () {
            myhandler(true, oImg)
          })
          oImg.on('deselected', function () {
            myhandler(false, oImg)
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
      const myhandler = this.objSelected
      shape.on('selected', function () {
        myhandler(true, shape)
      })
      shape.on('deselected', function () {
        myhandler(false, shape)
      })
      this.canvas.add(shape)
    },
    objSelected(selectedNow, obj) {
      if (selectedNow === false) {
        this.selection.disableControls = true
        this.selection.selectedObj = {}
        this.selection.angle = 0
        this.selection.bWidth = 0
        this.selection.opacity = 0
      } else {
        this.selection.disableControls = false
        this.selection.selectedObj = obj
        this.selection.angle = obj.get('angle')
        this.selection.bWidth = obj.get('strokeWidth')
        this.selection.opacity = obj.get('opacity')
      }
    },
    objEdited() {
      if (this.selection.colorIn === 'Fill') {
        const color = `rgb(${this.selection.colorR},${this.selection.colorG},${this.selection.colorB})`
        this.selection.selectedObj.set({
          fill: color,
        })
      } else if (this.selection.colorIn === 'Border') {
        const color = `rgb(${this.selection.colorR},${this.selection.colorG},${this.selection.colorB})`
        this.selection.selectedObj.set({
          stroke: color,
        })
      }
      this.selection.selectedObj.set({
        angle: this.selection.angle,
        opacity: this.selection.opacity,
        strokeWidth: this.selection.bWidth,
      })
      this.canvas.renderAll()
    },
  },
  head() {
    return {
      title: 'PICTOR',
    }
  },
}
</script>

<style></style>
