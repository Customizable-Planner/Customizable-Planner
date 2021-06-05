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
              v-for="(item) in dashboard"
              :key="item"
              :x="item.poseX"
              :y="item.poseY"
              @dragstop="onDrag"
              :parent="true"
              >
                <memolist-2 v-if="item.type === 'Memolist'" v-bind:num="item.index" v-on:pick-data="pickData"></memolist-2>
              </vue-draggable-resizable>
              <p>{{ memos.length }}</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import Memolist2 from '../components/Memolist2.vue'

const Datastore = require('nedb-promises')
const pageInfodb = Datastore.create('/path/to/pageInfodb.db') // 어떤 번호를 가진, 어떤 모듈이, 어디에 있었는지 정보 가짐.

export default {
  components: { Memolist2 },
  methods: {
    // 메모 add 버튼 클릭할 경우, memo 배열에 memo 추가해서 메모 개수 확인.
    // 대쉬보드 업데이트해서 위에 for문을 대쉬보드에 들어있는 내용이 출력되게 만듬.
    async addMemo (index) {
      console.log(index)
      this.memos.push({ memo: 'memo' })
      // 생성시에 타입과, 해당 타입의 인덱스 넘김
      pageInfodb.insert({ type: 'Memolist', index: this.memos.length - 1 })
      this.dashboard = await pageInfodb.find()
      console.log(this.dashboard)
    },
    onDrag (x, y) {
      this.items.poseX = x
      this.items.poseY = y
      console.log('onDrag', this.items.poseX, this.items.poseY)
    },
    async pickData (data) {
      this.items.type = data.type
      this.items.index = data.index
      console.log('pick Data', this.items.index, this.items.type, this.items.poseX, this.items.poseY)
      pageInfodb.remove({ type: this.items.type, index: this.items.index }, { multi: true })
      pageInfodb.insert({ type: this.items.type, index: this.items.index, poseX: this.items.poseX, poseY: this.items.poseY })
      const abcd = await pageInfodb.find({ type: this.items.type, index: this.items.index })
      console.log('what is in db', abcd)
    }
  },
  async mounted () {
    // pageInfodb.remove({}, { multi: true })
    this.dashboard = await pageInfodb.find()
  },
  data: () => ({
    modules: [
      'Memolist',
      'Image',
      'Todolist',
      'Calendar'
    ],
    memos: [],
    dashboard: {
      type: [],
      index: [],
      poseX: [],
      poseY: []
    },
    items: {
      type: null,
      index: null,
      poseX: null,
      poseY: null
    }
  })
}
</script>
