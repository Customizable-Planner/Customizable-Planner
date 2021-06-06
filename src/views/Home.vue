<template>
<div>
    <v-main id="main" class="grey lighten-3">
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
                  <v-list-item-content class="litem" :class="mode">
                    <v-list-item-title
                    @click="addModule(index)">
                    {{ module }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>
                <p>plug-in</p>
                <v-divider class="my-3"></v-divider>
                <p>Toggle</p>
                <v-container fluid>
                  <v-switch
                    v-model="switch1"
                    :label="`Switch 1: ${switch1.toString()}`"
                  ></v-switch>
                  <v-switch
                    v-model="switch2"
                    :label="`Switch 2: ${switch2.toString()}`">
                    </v-switch>
                </v-container>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <vue-draggable-resizable
                class-name-active="my-active-class"
                @activated="onActivated"
                @deactivated="onDeactivated"
                v-for="(item) in dashboard"
                :key="item"
                :x="item.poseX"
                :y="item.poseY"
                @dragstop="onDrag"
                :parent="true"
                w="auto" h="auto"
              >
                <memolist v-if="item.type === 'Memolist'" v-bind:num="item.index" v-on:pick-data="pickData"></memolist>
                <load-image v-else-if="item.type === 'Image'" v-bind:num="item.index" v-on:pick-data="pickData"></load-image>
                <todolist v-else-if="item.type === 'Todolist'" v-bind:num="item.index" v-on:pick-data="pickData">
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on">
                      편집
                    </v-btn>
                    <v-btn v-if="active" @click="deleteTodolist">삭제</v-btn>
                  </template>
                </todolist>
              </vue-draggable-resizable>
              <p>memo:{{ memos.length }}/todo:{{ todolists.length }}</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</div>
</template>

<script>
import LoadImage from '../components/loadImage.vue'
import Memolist from '../components/Memolist.vue'
import Todolist from '../components/Todolist.vue'
// import CalendarModule from '../components/CalendarModule.vue'  기존 달력 모듈 말고 v-cal로 사용함
const Datastore = require('nedb-promises')
const pageInfodb = Datastore.create('/path/to/pageInfodb.db') // 어떤 번호를 가진, 어떤 모듈이, 어디에 있었는지 정보 가짐.
export default {
  props: ['mode'],
  components: { Memolist, Todolist, LoadImage },
  methods: {
    async addModule (index) {
      if (index === 0) {
        this.memos.push({ memo: 'memo' })
        pageInfodb.insert({ type: 'Memolist', index: this.memos.length - 1 })
      } else if (index === 2) {
        this.todolists.push({ todo: 'todo' })
        pageInfodb.insert({ type: 'Todolist', index: this.todolists.length - 1 })
      } else if (index === 1) {
        this.images.push({ image: 'image' })
        pageInfodb.insert({ type: 'Image', index: this.todolists.length - 1 })
      }
      this.dashboard = await pageInfodb.find()
    },
    async deleteTodolist () {
      pageInfodb.remove({ type: 'Todolist', index: this.items.index }, { multi: true })
    },
    // 메모 add 버튼 클릭할 경우, memo 배열에 memo 추가해서 메모 개수 확인.
    // 대쉬보드 업데이트해서 위에 for문을 대쉬보드에 들어있는 내용이 출력되게 만듬.
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
    },
    async mounted () {
      await pageInfodb.remove({}, { multi: true })
      this.dashboard = await pageInfodb.find()
    },
    onActivated () {
      this.active = true
    },
    onDeactivated () {
      this.active = false
    }
  },
  data: () => ({
    switch1: true,
    switch2: false,
    modules: [
      'Memolist',
      'Image',
      'Todolist',
      'Calendar'
    ],
    memos: [],
    todolists: [],
    images: [],
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
<style scoped>
.my-active-class {
    border: 1px solid black;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}

.app {
  color: #15202B;
}
/* .dark li {
  background: #243a4e;
  color: #F3F3F3;
} */
.dark {
  background: #c3dcf3;
  color: #F3F3F3;
}
.dark button{
  background: #243a4e;
  color: #F3F3F3;
}

</style>
