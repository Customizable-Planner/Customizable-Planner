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
        <li class="list-group-item" v-for="(todo) in todos" v-bind:key="todo" @click="completeTodo(todo._id)">
        <v-icon v-if="todo.completed">mdi-check</v-icon>
        {{todo.name}}
          <div class="btn-group pull-right">
            <v-btn v-if="todo.completed" class="complete completed" outlined small>Complete</v-btn>
            <v-btn v-else class="complete" outlined small>UComplete</v-btn>
            <v-btn @click="deleteTodo(todo._id)" class="delete" color="secondary" outlined small>Delete</v-btn>
          </div>
        </li>
      </draggable>
    </ul>
</v-container>
</template>

<script>
import draggable from 'vuedraggable'

const Datastore = require('nedb-promises')
const tododb = Datastore.create('/path/to/tododb.db')
export default {
  name: 'Todolist',
  props: ['id'],
  components: {
    draggable
  },
  data () {
    return {
      todos: []
    }
  },
  async mounted () {
    this.todos = await tododb.find({ _id: this.id })
  },
  methods: {
    async deleteTodo (id) {
      // this.todos.splice(i, 1)
      await tododb.remove({ id: this.id, _id: id })
      this.todos = await tododb.find({ id: this.id })
    },
    async createTodo (name) {
      if (name != null) {
        await tododb.insert({ id: this.id, name: name, completed: false })
        // this.todos.push({ name: name, completed: false })
        // this.name = null
        // this.completed = false
        this.todos = await tododb.find({ id: this.id })
      }
    },
    async completeTodo (id) {
      const istrue = await tododb.find({ _id: id })
      await tododb.update({ _id: id }, { $set: { completed: !istrue.completed } })
      this.todos = await tododb.find({ id: this.id })
    }
  }
}
</script>
