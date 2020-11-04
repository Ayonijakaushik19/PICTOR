<template>
  <v-app>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <h1>Saved Drawings</h1>
          </v-col>
          <v-col>
            <v-chip v-if="!$store.state.logged" class="error">
              Please login to save canvas
            </v-chip>
          </v-col>
        </v-row>
        <v-row v-if="$store.state.logged" justify="center">
          <v-col cols="12" md="6">
            <v-card class="light-blue ma-4">
              <canvas
                id="curr_cnvs"
                :width="maxWidth * zoom"
                :height="maxHeight * zoom"
                style="border: 1px solid black"
                class="ma-2"
              ></canvas>
              <v-card-title class="mt-n2 pa-1 pl-3">
                CURRENT DRAWING
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="indigo"
                  text
                  :href="downloadFile"
                  :download="downloadName"
                  target="_blank"
                  @click="downloadCurrent()"
                >
                  Download as PNG
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-for="(c, id) in savedCanvas" :key="id" cols="12" md="6">
            <v-card class="grey ma-4">
              <canvas
                :id="`cnvs_${id}`"
                :width="maxWidth * zoom"
                :height="maxHeight * zoom"
                style="border: 1px solid black"
                class="ma-2"
              ></canvas>
              <v-card-title class="mt-n2 pa-1 pl-3">
                DRAWING {{ id }}
              </v-card-title>
              <v-card-actions>
                <v-btn color="indigo" text @click="editSaved(id)">
                  Edit this
                </v-btn>
                <v-btn color="indigo" text @click="deleteSaved(id)">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import { fabric } from 'fabric'
// import { uuid } from 'vue-uuid'
export default {
  data() {
    return {
      cols_val: 12,
      sm_val: 6,
      md_val: 4,
      lg_val: 3,
      cnvses: [],
      curr_cnvs: {},
      maxWidth: 640,
      maxHeight: 480,
      zoom: 0.5,
      downloadFile: {},
      downloadName: {},
    }
  },
  computed: {
    currentCanvas() {
      return this.$store.state.currentCanvas
    },
    savedCanvas() {
      return this.$store.state.savedCanvas
    },
  },
  mounted() {
    this.renderDrawings()
  },
  methods: {
    async downloadCurrent() {
      const image = await this.curr_cnvs.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1 / this.zoom,
      })
      this.downloadFile = image
      const d = new Date()
      this.downloadName =
        'drawing_' +
        d.getDate() +
        '_' +
        d.getMonth() +
        '_' +
        d.getFullYear() +
        '_' +
        d.getHours() +
        '_' +
        d.getMinutes() +
        '_' +
        d.getSeconds() +
        '.png'
    },
    editSaved(id) {
      this.$store.commit('currentCanvas', this.savedCanvas[id])
      this.$router.push('/')
    },
    deleteSaved(id) {
      this.$store.commit('deleteSaved', id)
      this.renderDrawings()
    },
    renderDrawings() {
      this.curr_cnvs = new fabric.StaticCanvas('curr_cnvs')
      this.curr_cnvs.loadFromJSON(this.currentCanvas)
      this.curr_cnvs.setZoom(this.zoom)

      for (let id = 0; id < this.savedCanvas.length; ++id) {
        this.cnvses.push(new fabric.StaticCanvas(`cnvs_${id}`))
        this.cnvses[id].loadFromJSON(this.savedCanvas[id])
        this.cnvses[id].setZoom(this.zoom)
      }
    },
  },
}
</script>

<style></style>
