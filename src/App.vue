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
          v-for="dashboard in dashboards"
          :key="dashboard"
          text
          @click="$router.push({name: 'dashboard'})"
        >
          {{ dashboard.title }}
        </v-btn>
        <v-btn
        small dark fab text color="purple"
        @click="addDashboard">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>

      </v-container>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    dashboards: [],
    index: 0
  }),
  methods: {
    addDashboard () {
      this.index++
      this.dashboards.push({ title: 'Dashboard' + this.index })
    }
  }
}
</script>
