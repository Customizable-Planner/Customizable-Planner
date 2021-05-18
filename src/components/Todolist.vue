<template>
<v-container class="container">
  <h2>Todo List</h2>
  <div class="input-group" style="margin-bottom:10px;">
    <input type="text" class="form-control" placeholder="입력" v-model="name" v-on:keyup.enter="createTodo(name)">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="createTodo(name)">추가</button>
    </span>
  </div>
    <ul class="list-group">
      <draggable v-model="todos">
        <li class="list-group-item" v-for="(todo, index) in todos" v-bind:key="todo" @click="todo.completed = !todo.completed">
        <v-icon v-if="todo.completed">mdi-check</v-icon>
        {{todo.name}}
          <div class="btn-group pull-right">
            <v-btn v-if="todo.completed" class="complete completed" outlined small>Complete</v-btn>
            <v-btn v-else class="complete" outlined small>UComplete</v-btn>
            <v-btn @click="deleteTodo(index)" class="delete" color="secondary" outlined small>Delete</v-btn>
          </div>
        </li>
      </draggable>
    </ul>
</v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  name: 'TodoPage',
  data () {
    return {
      todos: [
        {
          name: 'OSS',
          completed: false
        },
        {
          name: 'COMP',
          completed: false
        },
        {
          name: 'SW',
          completed: true
        },
        {
          name: 'Algo',
          completed: true
        }
      ]
    }
  },
  methods: {
    deleteTodo (i) {
      this.todos.splice(i, 1)
    },
    createTodo (name) {
      if (name != null) {
        this.todos.push({ name: name, completed: false })
        this.name = null
        this.completed = false
      }
    },
    completeTodo (i) {
      this.todos[i].completed = !this.todos[i].completed
    }
  }
}
</script>
