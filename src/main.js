import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.config.productionTip = false

export const eventBus = new Vue({
  methods: {
    listEdit (memo, index) {
      this.$emit('listEdit', memo, index)
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
