<template>
  <v-card
    class="mx-auto"
    color="#FFF59D"
    max-width="300"
    width="250"
    height="200"
    v-on:mouseup="memoClick"
  >
    <v-card-title>
      <v-row>
        <v-icon
          large
          left
        >
          mdi-note
        </v-icon>
        <span class="text-h6 font-weight-light">Memo</span>
        <v-spacer></v-spacer>
        <v-btn
        color='#FFFDE7'
        @click="save"
        z-index=10
        >
          저장
        </v-btn>
        <v-btn
        color='#FFFDE7'
        v-on:click="memoDelete"
        z-index=10
        >
          삭제
        </v-btn>
      </v-row>
    </v-card-title>
    <v-row no-gutters>
    <v-textarea
      outlined
      v-model="text"
    ></v-textarea>
    </v-row>
  </v-card>
</template>

<script>
const Datastore = require('nedb-promises')
const memodb = Datastore.create('/path/to/db.db')
// memodb db 구성요소 = id(pageinfodb의 고유 '_id' 저장) / text / _id( 이 값은 고유값 )

export default {
  name: 'memo-module',
  props: ['id'],
  data () {
    return {
      text: 'write your memo here!',
      items: []
    }
  },
  async mounted () {
    // memodb.remove({}, { multi: true })
    // const allval = await memodb.find()
    // console.log('all val', allval)
    this.items = await memodb.findOne({ id: this.id })
    // console.log(this.items)
    if (this.items === null) { // item 이 비어있으면
      this.text = 'write your memo here!'
      await memodb.insert({ id: this.id, text: this.text })
    } else {
      this.text = this.items.text
    }
    // const afterin = await memodb.find()
    // console.log('after in', afterin)
    // console.log('after in', this.text)
  },
  methods: {
    async save () { // save는 db update로 변경
      await memodb.update({ id: this.id }, { $set: { text: this.text } })
    },
    async memoDelete () {
      await memodb.remove({ id: this.id }, { multi: true })
      const memoindex = this.id // id는 고유값이기 때문에 지울때 굳이 타입같은거 보낼필요없음
      this.$emit('del-data', memoindex)
    },
    memoClick (x, y) {
      const memoindex = { id: this.id, type: 'Memolist', x: x, y: y }
      console.log('in memoClick', memoindex)
      this.$emit('pick-data', memoindex)
    }
  }
}
</script>

<style>
textarea {
  background: #c3c3c3;
}
.dark textarea {
    background: #15202B;
    color: #c3c3c3;
}
</style>
