<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-row>
    <memolist-2 v-bind:num='Memodata'></memolist-2>
    <memolist-2 v-bind:num='Memodata+1'></memolist-2>
    </v-row>
  </v-app>
</template>

<script>
import Memolist2 from './components/Memolist2.vue'
export default {
  components: { Memolist2 },
  name: 'app',
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates'
    ],
    Memodata: 1
  })
}
</script>
