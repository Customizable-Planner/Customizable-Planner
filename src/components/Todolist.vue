<template>
    <v-container>
        <v-layout row wrap>
          <slot name="activator" :on="{ mousedown: showListAdd }">
          </slot>
          <slot v-if="show">
            <v-flex xs12 text-center>
              <h1>todo list</h1>
              <p>전체 할일: {{todoList.length}} / 완료된 할일: {{countDone}}/ 남은 할일: {{todoList.length - countDone}}</p>
            </v-flex>
            <v-flex xs6 pa-2>
              <ListAdd
                  @listEdit="listEdit"
                  @listAdd="listAdd"/>
            </v-flex>
          </slot>
          <v-flex xs6 pa-2>
            <List
                :todoList='todoList'
                @statusControl="statusControl"
                @listDelete="listDelete"
            />
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import List from './List'
import ListAdd from './ListAdd'

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
      todoList: [],
      show: false
    }
  },
  methods: {
    showListAdd () {
      this.show = true
    },
    listAdd (memo) {
      console.log('받음')
      this.todoList.push({ memo: memo, status: 'created' })
      this.show = false
    },
    statusControl (index, status) {
      this.todoList[index].status = status
    },
    listDelete (index) {
      this.todoList.splice(index, 1)
    },
    listEdit (memo, index) {
      this.todoList[index].memo = memo
      this.show = false
    }
  }
}
</script>
