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
import draggable from 'vuedraggable'

export default {
  name: 'Todolist',
  components: {
    draggable
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
    createTodo (name) {
      if (name != null) {
        this.todos.push({ name: name, completed: false })
        this.name = null
        this.completed = false
      }
    },
    listEdit (memo, index) {
      this.todoList[index].memo = memo
      this.show = false
    }
  }
}
</script>
