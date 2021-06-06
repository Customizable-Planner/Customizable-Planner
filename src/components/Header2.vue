<template>
<div>
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
</div>
</template>

<script>
// import Header from '@/components/Header'
// import Home from '@/views/Home'
// import About from '@/views/About'

export default {
  name: 'header2',
  props: ['mode'],
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
<style scoped>
.app div{
  background: #e7bcbc;
  color: #15202B;
}

.dark header {
    background: #15202B;
    color: #dce3eb;
}
.dark div{
    background: #142230;
    color: #dce3eb;
}
.dark button{
    background: #15202B;
    color: #dce3eb;
}
/* .dark header nav {
    background: #15202B;
    color: #dce3eb;
} */
</style>
