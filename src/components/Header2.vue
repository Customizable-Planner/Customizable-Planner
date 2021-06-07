<template>
<div>

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
