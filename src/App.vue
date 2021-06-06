<template>
    <!-- <v-content>
      <router-view></router-view>
    </v-content> -->
  <div class="app" :class="mode">
      <Header2 :mode="mode"/>
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
</template>
<script>
import Header2 from '@/components/Header2'
import Home from '@/views/Home'
// import About from '@/views/About'

export default {
  name: 'app',
  data: () => ({
    dashboards: [],
    index: 0,
    mode: 'dark'
  }),
  methods: {
    addDashboard () {
      this.index++
      this.dashboards.push({ title: 'Dashboard' + this.index })
    }
  },
  components: {
    Header2,
    Home
    //  About
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
