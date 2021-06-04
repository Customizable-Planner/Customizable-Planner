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
                    v-if="index === 0" @click="addMemo">
                      {{ module }}
                    </v-list-item-title>
                    <v-list-item-title
                    v-else>
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
              @dragging="onDrag" @resizing="onResize" :parent="true"><memolist/></vue-draggable-resizable>
              <p>{{ memos.length }}</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import Memolist from '../components/Memolist.vue'
export default {
  components: { Memolist },
  methods: {
    addMemo () {
      this.memos.push({ memo: 'memo' })
    }
  },
  data: () => ({
    modules: [
      'Memolist',
      'Image',
      'Todolist',
      'Calendar'
    ],
    memos: []
  })
}
</script>
