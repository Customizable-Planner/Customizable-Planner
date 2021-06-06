import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueDraggableResizable from 'vue-draggable-resizable'
import firebase from 'firebase'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyBrf5VfMk8z10vCzOoXDbwI3DGKMsZIbj0',
  authDomain: 'calendar-db111.firebaseapp.com',
  projectId: 'calendar-db111',
  storageBucket: 'calendar-db111.appspot.com',
  messagingSenderId: '150863325673',
  appId: '1:150863325673:web:1d1398876934b7f2654378',
  measurementId: 'G-GNNF9LS7N4'
})

export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
