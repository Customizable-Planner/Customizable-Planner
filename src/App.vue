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
  <div class="app" :class="mode">
    <Header :mode="mode"/>
    <Home :mode="mode"/>
    <About :mode="mode"/>
    <!-- <v-content>
      <router-view></router-view>
    </v-content> -->
  </div>
</template>

<script>
import Header from '@/components/Header'
import Home from '@/views/Home'
import About from '@/views/About'

export default {
  name: 'app',
  data: () => ({
    dashboards: [],
    index: 0,
    mode: 'app'
  }),
  methods: {
    addDashboard () {
      this.index++
      this.dashboards.push({ title: 'Dashboard' + this.index })
    },
    components: {
    Header,
    Home,
    About
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto';
}
.app {
  width: 100vw;
  min-height: 100vh;
  background: #F3F3F3;
  color: #15202B;
}
.dark {
  background: #192734;
  color: #F3F3F3;
}
</style>
