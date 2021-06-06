<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 text-center>
                <h1>todo list</h1>
                <p>전체 할일: {{todoList.length}} / 완료된 할일: {{countDone}}/ 남은 할일: {{todoList.length - countDone}}</p>
            </v-flex>
            <v-flex xs6 pa-2>
                <List
                    :todoList='todoList'
                    @statusControl="statusControl"
                    @listDelete="listDelete"
                />
            </v-flex>
            <v-flex xs6 pa-2>
                <ListAdd
                    @listEdit="listEdit"
                    @listAdd="listAdd"
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import List from './List'
import ListAdd from './ListAdd'

const Datastore = require('nedb-promises')
const todolistdb = Datastore.create('/path/to/todolistdb.db')

export default {
  components: {
    List,
    ListAdd
  },
  computed: {
    countDone () {
      let count = 0
      this.todoList.forEach(List => {
        if (List.status === 'done') count++
      })
      return count
    }
  },
  data () {
    return {
      todoList: []
    }
  },
  async mounted () {
    this.todoList = await todolistdb.find()
  },
  methods: {
    async listAdd (memo) {
      console.log('받음')
      await todolistdb.insert({ memo: memo, status: 'created' })
      this.todoList = await todolistdb.find()
      console.log(this.todoList)
      // this.todoList.push({ memo: memo, status: 'created' })
    },
    async statusControl (index, status) {
      await todolistdb.update({ _id: index }, { $set: { status: status } })
      this.todoList = todolistdb.find()
      // this.todoList[index].status = status
    },
    async listDelete (index) {
      await todolistdb.remove({ _id: index }, { multi: true })
      this.todoList = await todolistdb.find()
      console.log(index)
      // this.todoList.splice(index, 1)
    },
    async listEdit (memo, index) {
      await todolistdb.update({ _id: index }, { $set: { memo: memo } })
      this.todoList = todolistdb.find()
      // this.todoList[index].memo = memo
    }
  }
}
</script>
