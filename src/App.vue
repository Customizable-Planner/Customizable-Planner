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
          :key="dashboard.title"
          text
          @click="clickedNum(dashboard._id)"
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
// import Header from '@/components/Header'
import Home from '@/views/Home'
import { indexBus } from './main'
// import About from '@/views/About'

const Datastore = require('nedb-promises')
const dashboarddb = Datastore.create('/path/to/dashboarddb.db') // 대쉬보드 생성된 것들 저장
export default {
  name: 'app',
  data: () => ({
    dashboards: [],
    index: 0,
    mode: 'app'
  }),
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
    //   Header,
    Home
    //   About
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
