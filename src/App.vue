<template>
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
  data () {
    return {
      mode: 'app'
    }
  },
  components: {
    Header,
    Home,
    About
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
