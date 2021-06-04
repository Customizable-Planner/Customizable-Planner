<template>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="(module, index) in modules"
                  :key="index"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title
                    @click="addModule(index)">
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
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <vue-draggable-resizable
              v-for="(memo, index) in memos"
              :key="index"
              :parent="true">
                <memolist
                  @memolistDelete="memolistDelete"/></vue-draggable-resizable>
              <vue-draggable-resizable
              v-if="todolist === true" :parent="true">
              <todolist/>
              </vue-draggable-resizable>
              <p>memo 개수 : {{ memos.length }} / todolist show: {{todolist}}</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import Memolist from '../components/Memolist.vue'
import Todolist from '../components/Todolist.vue'
export default {
  components: { Memolist, Todolist },
  methods: {
    addModule (index) {
      if (index === 0) {
        this.memos.push({ memo: 'memo' })
      } else if (index === 1) {
        this.todolist = true
      }
    },
    memolistDelete (num) {
      this.memos.splice(num, 1)
    }
  },
  data: () => ({
    modules: [
      'Memolist',
      'Todolist',
      'Image',
      'Calendar'
    ],
    memos: [],
    todolist: false
  })
}
</script>
