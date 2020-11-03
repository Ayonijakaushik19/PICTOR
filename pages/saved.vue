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
              <v-card-subtitle class="pb-0"> CURRENT DRAWING </v-card-subtitle>
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
              <v-card-subtitle class="pb-0"> DRAWING {{ id }} </v-card-subtitle>
              <v-card-actions>
                <v-btn color="orange" text @click="editSaved(id)">
                  Edit this
                </v-btn>
                <v-btn color="orange" text @click="deleteSaved(id)">
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
