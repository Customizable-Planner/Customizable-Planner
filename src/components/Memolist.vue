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
        name="input-7-4"
        label="Memo"
        value="write your memo"
      >
      </v-textarea>
    </v-row>
  </v-card>
</template>
<script>
const Datastore = require('nedb-promises')
const memodb = Datastore.create('/path/to/db.db')
export default {
  name: 'memo-module',
  props: ['num', 'mode'],
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
    async memoDelete () {
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

<style>
textarea {
  background: #c3c3c3;
}
.dark textarea {
    background: #15202B;
    color: #c3c3c3;
}
</style>
