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
    height="800px"
    justify="center"
    >
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
      <!--컴포넌트 추가하는 부분-->
      <vue-draggable-resizable>
        <image-insert-module/>
      </vue-draggable-resizable>
      <vue-draggable-resizable>
        <todolist/>
      </vue-draggable-resizable>
      <vue-draggable-resizable @dragging="onDrag" @resizing="onResize" :parent="true">
        <memolist/>
      </vue-draggable-resizable>
    </v-card>
    <!--<v-fab-transition>
    <calendar-module v-show="!hidden"></calendar-module>
    </v-fab-transition>-->
    <!-- <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable :w="100" :h="100" :x="x" :y="y" @dragging="onDrag" @resizing="onResize" :parent="true">
        <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
        X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
      </vue-draggable-resizable>
    </div> -->
  </section>
</template>

<script>
import CalendarModule from './CalendarModule.vue'
import Todolist from './Todolist.vue'
import Memolist from './Memolist.vue'
import ImageInsertModule from './ImageInsertModule.vue'

export default {
  name: 'helloworld',
  components: { CalendarModule, Memolist, Todolist, ImageInsertModule },
  data: function () {
    return {
      width: 0,
      height: 0,
      x: 50,
      y: 50,
      hidden: true,
      overlay: false,
      absolute: true,
      zIndex: 10,
      opacity: 1,
      xxxx: false
    }
  },
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
      this.xxxx = true
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  }
}
</script>
