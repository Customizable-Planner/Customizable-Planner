<template>
  <section
    class="row"
    >
    <v-card
      class="col mt-15"
      elevation="9"
      max-width="400"
      dense
      tile
    >
      <v-list-item>
        <v-chip draggable x-large>
          <v-icon left>
            mdi-home
          </v-icon>
          메모
        </v-chip>
      </v-list-item>
      <v-list-item>
        <v-chip draggable x-large>
          <v-icon left>
            info
          </v-icon>
          체크리스트
        </v-chip>
      </v-list-item>
      <v-list-item>
        <v-chip draggable x-large>
          <v-icon left>
            info
          </v-icon>
          이미지
        </v-chip>
      </v-list-item>
      <v-list-item>
        <v-chip draggable x-large>
          <v-icon left>
            info
          </v-icon>
          원형타임테이블
        </v-chip>
      </v-list-item>
      <v-list-item>
        <v-btn draggable>
          <v-icon left>
            info
          </v-icon>
          cannot drag</v-btn>
      </v-list-item>
    </v-card>
    <v-card
    elevation="9"
    class="ml-15 mt-10"
    width="1000px"
    height="600px"
    @click="someMethod">
    </v-card>
  <add-module></add-module>
  </section>
</template>
<script>
import AddModule from './addModule.vue'
export default {
  name: 'helloworld',
  components: { AddModule },
  methods: {
    someMethod (event) {
      // clientX/Y gives the coordinates relative to the viewport in CSS pixels.
      console.log(event.clientX)// x coordinate
      console.log(event.clientY)// y coordinate

      // pageX/Y gives the coordinates relative to the <html> element in CSS pixels.
      console.log(event.pageX)
      console.log(event.pagey)

      // screenX/Y gives the coordinates relative to the screen in device pixels.
      console.log(event.screenX)
      console.log(event.screenY)
    }
  }
}
</script>
