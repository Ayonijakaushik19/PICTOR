<template>
  <v-app>
    <!--
    <v-system-bar app status color="indigo lighten-1" height="20">
      <strong> Status Bar </strong>
      <v-spacer />
      <v-icon>mdi-account</v-icon>
      <v-icon>mdi-cloud-check</v-icon>
      <v-icon>mdi-wifi-strength-4</v-icon>
    </v-system-bar>
    -->

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
          <v-list-item-title class="title"
            >Hi {{ vuexUsername }}</v-list-item-title
          >
          <v-list-item-subtitle> Where to go? </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item link to="/registration">
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>Login/Logout</v-list-item-content>
        </v-list-item>
        <v-list-item link to="/">
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>Current Drawing</v-list-item-content>
        </v-list-item>
        <v-list-item link to="/saved">
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>Saved Drawings</v-list-item-content>
        </v-list-item>
        <v-list-item link to="/color">
          <v-list-item-icon><v-icon>mdi-arrow-right</v-icon></v-list-item-icon>
          <v-list-item-content>Color Extraction</v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-footer absolute>
        <v-container>
          <v-row justify="start">
            <v-col cols="12">
              <v-chip class="ma-n1"> Made by Nandeesh </v-chip>
              <v-btn
                v-for="(sm, id) in social"
                :key="id"
                icon
                :href="sm.link"
                target="_blank"
                small
              >
                <v-icon>{{ sm.icon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-navigation-drawer>

    <v-main class="blue-grey">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: 'Default',
  data() {
    return {
      alert_welcome: false,
      drawer: false,
      social: [
        { icon: 'mdi-github', link: 'https://www.github.com/NandeeshG/PICTOR' },
        {
          icon: 'mdi-linkedin',
          link: 'https://www.linkedin.com/in/nandeesh-gupta-05b43014a/',
        },
      ],
      cols_val: 12,
      sm_val: 6,
      md_val: 4,
      lg_val: 3,
    }
  },
  computed: {
    vuexUsername() {
      return this.$store.state.username
    },
  },
}
</script>

<style></style>
