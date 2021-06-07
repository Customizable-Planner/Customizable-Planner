<template>
<v-app>
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
            v-for="(dashboard, index) in dashboards"
            :key="index"
            text
            @click="clickedNum(index)"
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
    <!-- <v-content>
      <router-view></router-view>
    </v-content> -->
  <div class="app" :class="mode">
      <Home :mode="mode"/>
  </div>
  <!-- <div class="app" :class="mode">
    <Header :mode="mode"/>
    <Home :mode="mode"/>
    <About :mode="mode"/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div> -->
</v-app>
</template>
<script>
// import Header2 from '@/components/Header2'
import Home from '@/views/Home'
import { indexBus, modeBus } from './main'
// import About from '@/views/About'

export default {
  name: 'app',
  data: () => ({
    dashboards: [
      {
        title: 'Dashboard1',
        num: 0
      }
    ],
    index: 1,
    mode: 'dark',
    sendWhat: 0
  }),
  created () {
    modeBus.$on('toggleChange', mode => {
      this.mode = mode
    })
  },
  methods: {
    addDashboard () {
      this.index++
      this.dashboards.push({ title: 'Dashboard' + this.index, num: this.index })
    },
    clickedNum (index) {
      // 데쉬보드 데이타베이스
      indexBus.infoDashboard(index)
    }
  },
  components: {
    Home
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
  background: #F3F3F3;
  color: #15202B;
}
.dark {
  background: #192734;
  color: #F3F3F3;
}
</style>
