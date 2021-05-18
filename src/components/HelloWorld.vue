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
          일기장
        </v-chip>
      </v-list-item>
      <v-list-item>
        <v-chip
        @dragend="memoMethod"
        draggable
        x-large>
          <v-icon left>
            mdi-home
          </v-icon>
          메모
          <memo-module />
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
    </v-card>
    <v-card
    elevation="9"
    class="ml-15 mt-10"
    width="1000px"
    height="600px"
    justify="center"
    @click="someMethod">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            @click="overlay = !overlay"
          ><!-- overlay -> hidden -->
          <v-icon left>
            mdi-calendar-month
          </v-icon>
           <!-- card 밖에서 사라졌다 나타났다
           {{hidden ? 'Calendar Show' : 'Calendar Hide'}} -->
          </v-btn>
        </template>
        <span>Show Calendar</span>
      </v-tooltip>
      <v-overlay
        :z-index="zIndex"
        :value="overlay"
      >
        <v-btn
          color="orange lighten-2"
          @click="overlay=false"
        >
          Hide Calendar
        </v-btn>
        <calendar-module></calendar-module>
      </v-overlay>
    </v-card>
    <!--<v-fab-transition>
    <calendar-module v-show="!hidden"></calendar-module>
    </v-fab-transition>-->
  </section>
</template>
<script>
import CalendarModule from './CalendarModule.vue'
import Memolist from './Memolist.vue'

export default {
  name: 'helloworld',
  components: { CalendarModule, Memolist },
  data: () => ({
    hidden: true,
    overlay: false,
    absolute: true,
    zIndex: 0,
    opacity: 1
  }),
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
    },
    memoMethod (event) {
      // clientX/Y gives the coordinates relative to the viewport in CSS pixels.
      console.log(event.clientX)// x coordinate
      console.log(event.clientY)// y coordinate

      // pageX/Y gives the coordinates relative to the <html> element in CSS pixels.
      console.log(event.pageX)
      console.log(event.pageY)

      // screenX/Y gives the coordinates relative to the screen in device pixels.
      console.log(event.screenX)
      console.log(event.screenY)
    }
  }
}
</script>
