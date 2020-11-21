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
          <v-row>
            <v-btn
              :disabled="selection.disableControls"
              icon
              light
              @click="objDeleted"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <v-btn
              :disabled="selection.disableControls"
              icon
              light
              @click="objSendBack"
              ><v-icon>mdi-arrange-send-backward</v-icon></v-btn
            >
            <v-btn
              :disabled="selection.disableControls"
              icon
              light
              @click="objBringForward"
              ><v-icon>mdi-arrange-bring-forward</v-icon></v-btn
            >
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn dense class="mb-5" rounded small @click="saveThisCanvas">
                SAVE
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn dense class="mb-5" rounded small @click="clearThisCanvas">
                CLEAR
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="successAlert"
      timeout="1000"
      bottom
      left
      rounded="r-xl"
      color="blue"
      transition="slide-x-transition"
    >
      Successful!
    </v-snackbar>
    <v-snackbar
      v-model="failureAlert"
      timeout="1000"
      bottom
      left
      rounded="r-xl"
      color="red"
      transition="slide-x-transition"
    >
      FAILED : {{ failureMessage }}
    </v-snackbar>

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
        label="Add Shape"
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
      <v-btn
        v-if="!canvasIsDrawingMode"
        icon
        dense
        class="mb-5"
        @click="freeDraw(true)"
      >
        <v-icon>mdi-brush</v-icon>
      </v-btn>
      <v-btn v-else icon dense class="mb-5" @click="freeDraw(false)">
        <v-icon>mdi-stop-circle</v-icon>
      </v-btn>

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
      canvas: undefined,
      successAlert: false,
      failureAlert: false,
      failureMessage: '',
      canvasIsDrawingMode: false,
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
      },
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
    currentCanvas() {
      return this.$store.state.currentCanvas
    },
  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas')
    if (this.currentCanvas !== {}) {
      this.canvas.loadFromJSON(this.currentCanvas)
    }
    this.canvas.set('preserveObjectStacking', true)
    this.canvas.on('mouse:move', () => {
      this.checkSomeObjectActive()
      this.saveCanvas()
    })
  },
  methods: {
    freeDraw(val) {
      this.canvas.set('isDrawingMode', val)
      this.canvasIsDrawingMode = val
    },
    checkSomeObjectActive() {
      let ret = false
      if (this.canvas === undefined || this.canvas === {}) {
        ret = false
      } else {
        ret = !!(this.canvas.getActiveObjects().length > 0)
      }
      if (ret === false) {
        this.selection.disableControls = true
        this.selection.angle = 0
        this.selection.bWidth = 0
        this.selection.opacity = 0
      } else {
        this.selection.disableControls = false
        this.selection.angle = this.canvas.getActiveObject().get('angle')
        this.selection.bWidth = this.canvas.getActiveObject().get('strokeWidth')
        this.selection.opacity = this.canvas.getActiveObject().get('opacity')
      }
      return ret
    },
    addText() {
      const text = new fabric.Text(this.userText, {
        left: 20,
        right: 20,
        fontFamily: 'Hoefler Text',
      })
      this.canvas.add(text)
    },
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
            scaleX: 0.35,
            scaleY: 0.35,
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
    saveCanvas() {
      this.$store.commit('currentCanvas', this.canvas.toJSON())
    },
    saveThisCanvas() {
      this.saveCanvas()
      try {
        this.$store.commit('savedCanvas', this.canvas.toJSON())
        this.successAlert = true
      } catch (err) {
        this.failureAlert = true
        this.failureMessage = err
      }
    },
    clearThisCanvas() {
      this.canvas.clear()
    },
    objDeleted() {
      this.canvas.getActiveObjects().forEach((obj) => {
        this.canvas.remove(obj)
      })
      this.canvas.discardActiveObject().renderAll()
    },
    objSendBack() {
      this.canvas.getActiveObjects().forEach((obj) => {
        this.canvas.sendBackwards(obj, true)
        this.canvas.renderAll()
      })
    },
    objBringForward() {
      this.canvas.getActiveObjects().forEach((obj) => {
        this.canvas.bringForward(obj, true)
        this.canvas.renderAll()
      })
    },
    objEdited() {
      const color = `rgb(${this.selection.colorR},${this.selection.colorG},${this.selection.colorB})`
      if (this.selection.colorIn === 'Fill') {
        this.canvas.getActiveObjects().forEach((obj) => {
          obj.set({ fill: color })
        })
      } else if (this.selection.colorIn === 'Border') {
        this.canvas.getActiveObjects().forEach((obj) => {
          obj.set({ stroke: color })
        })
      }
      this.canvas.getActiveObjects().forEach((obj) => {
        obj.set({
          angle: this.selection.angle,
          opacity: this.selection.opacity,
          strokeWidth: this.selection.bWidth,
        })
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
