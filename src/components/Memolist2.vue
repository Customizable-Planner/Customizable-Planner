<template>
  <v-card
    class="mx-auto"
    color="#FFF59D"
    max-width="300"
    width="250"
    height="200"
    v-on:click="memoClick"
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
        >
          저장
        </v-btn>
        <v-btn
        color='#FFFDE7'
        v-on:click="memoDelete"
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
export default {
  name: 'memo-module',
  props: ['num'],
  data () {
    return {
      text: 'write your memo here!',
      items: []
    }
  },
  async mounted () {
    const allval = await memodb.find()
    console.log('all val', allval)
    this.items = await memodb.findOne({ num: this.num })
    console.log(this.items)
    if (this.items !== null) {
      this.text = this.items.text
    }
  },
  methods: {
    async save () {
      memodb.remove({ num: this.num }, { multi: true })
      memodb.insert({ num: this.num, text: this.text })
    },
    memoDelete () {
      memodb.remove({ num: this.num }, { multi: true })
      this.text = null
    },
    memoClick () {
      const memoindex = { index: this.num, type: 'Memolist' }
      console.log('in memoClick', memoindex)
      this.$emit('pick-data', memoindex)
    }
  }
}
</script>
