<template>
  <v-app>
    <v-system-bar app status color="indigo lighten-1" height="20">
      <strong> Status Bar </strong>
      <v-spacer />
      <v-icon>mdi-account</v-icon>
      <v-icon>mdi-cloud-check</v-icon>
      <v-icon>mdi-wifi-strength-4</v-icon>
    </v-system-bar>

    <v-app-bar app color="black">
      <v-btn icon @click="drawer = !drawer">
        <v-icon large>mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-icon large color="primary">Pictor</v-icon>
      <v-spacer></v-spacer>
      <v-avatar size="46" color="grey">
        <img src="../static/v.png" alt="alt" />
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Hi {{ username }}</v-list-item-title>
          <v-list-item-subtitle> Where to go? </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>New Canvas</v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>Saved Drawings</v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-container>
        <v-btn v-for="ic in f_ics" :key="ic" icon>
          <v-icon>{{ ic }}</v-icon>
        </v-btn>
      </v-container>

      <v-divider />

      <v-btn
        v-if="!alert_welcome"
        color="black"
        transition="slide-y-reverse-transition"
        @click="alert_welcome = true"
        >Welcome</v-btn
      >
      <v-alert
        v-model="alert_welcome"
        color="primary"
        dismissible
        max-width="600"
        icon="mdi-emoticon-happy"
        transition="slide-y-transition"
      >
        You are welcome!
      </v-alert>

      <v-divider />

      <v-chip class="ma-4"> PICTOR - {{ new Date().getFullYear() }} </v-chip>
    </v-navigation-drawer>

    <v-main class="blue-grey">
      <v-container>
        <canvas id="canvas" width="200" height="200"></canvas>
      </v-container>
    </v-main>

    <v-bottom-navigation class="black" app>
      <v-btn color="blue-grey">Control button</v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {
      alert_welcome: false,
      drawer: false,
      username: 'Nandeesh',
      f_ics: ['mdi-twitter', 'mdi-instagram', 'mdi-facebook', 'mdi-youtube'],
    }
  },
}
</script>

<style></style>
