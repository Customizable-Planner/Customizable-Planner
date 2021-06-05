<template>
    <v-main id="main" class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-flex rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="(module, index) in modules"
                  :key="index"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title
                    v-if="index === 0" @click="addMemo">
                      {{ module }}
                    </v-list-item-title>
                    <!-- addimage 함수추가해야함 일단 todo로 해둠  -->
                    <v-list-item-title
                    v-else-if="index ===1" @click="addTodo">
                      {{ module }}
                    </v-list-item-title>
                    <v-list-item-title
                    v-else-if="index ===2" @click="addTodo">
                      {{ module }}
                    </v-list-item-title>
                    <v-list-item-title
                    v-else @click="addCalendar">
                      {{ module }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>
                <p>plug-in</p>
                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title @click="$router.push({name: 'about'})">
                      ab
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <vue-draggable-resizable
              v-for="(memo, index) in memos"
              :key="index"
              @dragging="onDrag" @resizing="onResize" :parent="true"><memolist/></vue-draggable-resizable>
              <p>{{ memos.length }}</p>
              <vue-draggable-resizable
              v-for="(todo, index) in todos"
              :key="index"
              @dragging="onDrag" @resizing="onResize" :parent="true"><Todolist/></vue-draggable-resizable>
              <p>{{ todos.length }}</p>
              <vue-draggable-resizable
              v-for="(calendar, index) in calendars"
              :key="index"
              @dragging="onDrag" @resizing="onResize" :parent="true"><v-calendar></v-calendar></vue-draggable-resizable>
              <p>{{ calendars.length }}</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import Memolist from '../components/Memolist.vue'
import Todolist from '../components/Todolist.vue'
// import CalendarModule from '../components/CalendarModule.vue'  기존 달력 모듈 말고 v-cal로 사용함
export default {
  components: { Memolist, Todolist },
  methods: {
    addMemo () {
      this.memos.push({ memo: 'memo' })
    },
    addTodo () {
      this.todos.push({ todos: 'todo' })
    },
    addCalendar () {
      this.calendars.push({ calendar: 'calendar' })
    }
  },
  data: () => ({
    modules: [
      'Memolist',
      'Image',
      'Todolist',
      'Calendar'
    ],
    memos: [],
    todos: [],
    calendars: []
  })
}
</script>
