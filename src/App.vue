<template>
<v-app :class="mode">
  <header>
        <v-container class="py-0 fill-height">
          <v-avatar
            class="mr-10"
            color="grey darken-1"
            size="32"
          ></v-avatar>
          <button
            style="padding: 20px; font-size: 18px"
            v-for="(dashboard, index) in dashboards"
            :key="index"
            text
            @click="clickedNum(index)"
          >
            {{ dashboard.title }}
          </button>
          <v-btn
          small dark fab text color="purple"
          @click="addDashboard">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-container>
      </header>
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

const Datastore = require('nedb-promises')
const dashboarddb = Datastore.create('/path/to/dashboarddb.db') // 대쉬보드 생성된 것들 저장
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
    mode: 'app',
    sendWhat: 0
  }),
  created () {
    modeBus.$on('toggleChange', mode => {
      this.mode = mode
    })
  },
  async mounted () {
    await dashboarddb.remove({}, { multi: true })
    await dashboarddb.insert({ title: 'Dashboard1', _id: 1 })
    this.dashboards = await dashboarddb.find()
  },
  methods: {
    async addDashboard () {
      const dashNum = await dashboarddb.find()
      await dashboarddb.insert({ title: 'Dashboard' + (dashNum.length + 1), _id: (dashNum.length + 1) })
      this.dashboards = await dashboarddb.find()
      console.log(this.dashboards)
      // this.index++
      // this.dashboards.push({ title: 'Dashboard' + this.index })
    },
    async clickedNum (index) {
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
header {
    height: 60px;
    background: #c3c3c3;
}
.dark header {
    background: #403047;
    color: #FFFFFF
}
</style>
