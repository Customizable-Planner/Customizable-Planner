<template>
<content>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" class="litem" :class="mode">
              <v-list color="transparent">
                <v-list-item
                  v-for="(module, index) in modules"
                  :key="index"
                  link
                >
                  <v-list-item-content class="litem2" :class="mode">
                    <v-list-item-title
                    @click="addModule(index)">
                    {{ module }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  color="error"
                  @click="overlay = !overlay"
                >
                  IMG UPLOAD
                </v-list-item>

                <v-overlay :value="overlay">
                  <v-file-input
                  v-model="insertedImage"
                  accept="image/*"
                  label="File input">
                  </v-file-input>
                  <v-btn
                    @click="upload"
                  >
                  upload
                  </v-btn>
                  <v-btn
                    icon
                    @click="overlay = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-overlay>
                <v-divider class="my-2"></v-divider>
                <Toggle :mode="mode" @toggle="toggle"/>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              height="900"
              width="1300"
              rounded="lg"
              class="litem" :class="mode"
            >
              <vue-draggable-resizable
                class-name-active="my-active-class"
                @activated="onActivated"
                @deactivated="onDeactivated"
                v-for="(item, i) in dashboard"
                :key="i"
                :x="item.poseX"
                :y="item.poseY"
                @dragstop="onDrag"
                :parent="true"
                w="auto" h="auto"
              >
                <memolist v-if="item.type === 'Memolist'" v-bind:id="item._id" v-on:pick-data="pickData" v-on:del-data="delData" z-index=1></memolist>
                <load-image v-else-if="item.type === 'Image'" v-bind:item="item" v-on:pick-data="pickData" v-on:del-data="delData"></load-image>
                <todolist v-else-if="item.type === 'Todolist'" v-bind:id="item._id" v-on:pick-data="pickData" v-on:del-data="delData">
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on">
                      편집
                    </v-btn>
                    <v-btn v-if="active" @click="deleteTodolist">삭제</v-btn>
                  </template>
                </todolist>
              </vue-draggable-resizable>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</content>
</template>

<script>
import LoadImage from '../components/loadImage.vue'
import Memolist from '../components/Memolist.vue'
import Todolist from '../components/Todolist.vue'
import Toggle from '../components/Toggle.vue'
import { indexBus, modeBus } from '../main'
// import CalendarModule from '../components/CalendarModule.vue'  기존 달력 모듈 말고 v-cal로 사용함
const Datastore = require('nedb-promises')
const pageInfodb = Datastore.create('/path/to/pageInfodb.db') // 어떤 번호를 가진, 어떤 모듈이, 어디에 있었는지 정보 가짐.
// pageinfo db 구성요소 = 모듈type / poseX / poseY / _id( 이 값은 고유값 )
export default {
  props: ['mode'],
  components: { Memolist, Todolist, LoadImage, Toggle },
  async created () {
    indexBus.$on('sendNum', async (info) => {
      this.sendWhat = info
      console.log('sendNum', this.sendWhat)
      this.dashboard = await pageInfodb.find({ dashid: this.sendWhat })
      console.log('create 단계', this.dashboard)
    })
  },
  methods: {
    toggle () {
      if (this.mode === 'dark') {
        this.mode = 'app'
      } else {
        this.mode = 'dark'
      }
      modeBus.changeMode(this.mode)
      console.log('**************************')
      console.log('home.vue -->' + this.mode)
    },
    async upload () {
      this.overlay = false
      console.log(this.insertedImage)
      console.log(URL.createObjectURL(this.insertedImage))
      const url = URL.createObjectURL(this.insertedImage)
      await pageInfodb.insert({ type: 'Image', poseX: 0, poseY: 0, dashid: this.sendWhat, url: url })
      this.dashboard = await pageInfodb.find({ dashid: this.sendWhat })
      console.log(this.dashboard)
    },
    async addModule (index) {
      if (index === 0) {
        // this.memos.push({ memo: 'memo' })
        await pageInfodb.insert({ type: 'Memolist', poseX: 0, poseY: 0, dashid: this.sendWhat })
      } else if (index === 2) {
        // this.todolists.push({ todo: 'todo' })
        await pageInfodb.insert({ type: 'Todolist', poseX: 0, poseY: 0, dashid: this.sendWhat })
      } else if (index === 1) {
        // this.images.push({ image: 'image' })
        await pageInfodb.insert({ type: 'Image', poseX: 0, poseY: 0, dashid: this.sendWhat })
      }
      this.dashboard = await pageInfodb.find({ dashid: this.sendWhat })
      console.log(this.dashboard)
    },
    async deleteTodolist () {
      pageInfodb.remove({ type: 'Todolist', index: this.items.index, dashid: this.sendWhat }, { multi: true })
    },
    // 대쉬보드 업데이트해서 위에 for문을 대쉬보드에 들어있는 내용이 출력되게 만듬.
    onDrag (x, y) {
      this.items.poseX = x
      this.items.poseY = y
      // console.log('onDrag', this.items.poseX, this.items.poseY)
    },
    async pickData (data) { // pick 한 data에 대한 위치정보를 수정할때도 db update로 변경
      this.items.index = data.id
      this.items.type = data.type
      console.log('pick Data', this.items.index, this.items.poseX, this.items.poseY)
      await pageInfodb.update({ dashid: this.sendWhat, _id: this.items.index }, { $set: { poseX: this.items.poseX, poseY: this.items.poseY } })
      await pageInfodb.find({ type: this.items.type, dashid: this.sendWhat })
      // const abcd = await pageInfodb.find({ type: this.items.type, dashid: this.sendWhat })
      // console.log('what is in db', abcd)
      this.dashboard = await pageInfodb.find({ dashid: this.sendWhat })
    },
    async delData (id) {
      const delId = id
      await pageInfodb.remove({ dashid: this.sendWhat, _id: delId }, { multi: true })
      this.dashboard = await pageInfodb.find({ dashid: this.sendWhat })
    },
    onActivated () {
      this.active = true
    },
    onDeactivated () {
      this.active = false
    }
  },
  async mounted () {
    console.log('dddddddddddddddddddddddddddd')
    await pageInfodb.remove({}, { multi: true })
    this.dashboard = await pageInfodb.find({ dashid: this.sendWhat })
  },
  data: () => ({
    overlay: false,
    insertedImage: null,
    sendWhat: 0,
    modules: [
      'Memolist',
      'Image',
      'Todolist',
      'Calendar'
    ],
    // memos: [],
    // todolists: [],
    // images: [],
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
  background: #ffffff;
  color: #15202B;
}
.dark li {
  background: #243a4e;
  color: #F3F3F3;
}
.dark {
  background: #354c63;
  color: #F3F3F3;
}
.dark button{
  background: #243a4e;
  color: #F3F3F3;
}
.dark content {
  background: #16222e;
  color: #F3F3F3;
}

</style>
