<template>
<v-container class="container" v-on:mouseup="todoClick" :class="mode">
  <h2>
  Todo List
  <button class="btn btn-default" type="button" v-on:click="$emit('del-data', id)">
    <v-icon color="red">mdi-trash-can-outline</v-icon>
  </button>
  </h2>
  <div class="input-group" style="margin-bottom:10px;">
    <input type="text" class="form-control" placeholder="입력" v-model="name" v-on:keyup.enter="createTodo(name)">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="createTodo(name)">추가</button>
    </span>
  </div>
    <ul class="list-group">
      <draggable v-model="todos">
        <li class="list-group-item" v-for="(todo, index) in todos" v-bind:key="index">
        <v-icon v-if="todo.completed">mdi-check</v-icon>
          {{todo.name}}
          <div class="btn-group pull-right">
            <v-btn v-if="todo.completed" class="complete completed" outlined small @click="completeTodo(index)">Complete</v-btn>
            <!-- <v-btn v-else class="complete" outlined small @click="completeTodo(index)">UComplete</v-btn> -->
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
  props: ['id', 'mode'],
  components: {
    draggable
  },
  data () {
    return {
      todos: []
    }
  },
  async mounted () {
    // tododb.remove({}, { multi: true })
    this.todos = await tododb.find({ id: this.id })
    console.log('mount todolist ----------', this.todos)
  },
  watch: {
    async id () {
      this.todos = await tododb.find({ id: this.id })
      console.log('watch todolist ----------', this.todos)
    }
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
    async completeTodo (index) {
      const istrue = await tododb.find({ _id: this.todos[index]._id })
      console.log('****************************' + istrue)
      let cc = istrue.completed
      if (istrue.completed === true) {
        cc = false
      } else {
        cc = true
      }
      console.log('val eeeeeeeeeeeeeeeeeeeeeeeeeeeee', cc)
      tododb.update({ _id: this.todos[index]._id }, { $set: { completed: cc } })
      this.todos = await tododb.find({ id: this.id })
      console.log('complete Todo ````````````````````````', this.todos)
    },
    todoClick (x, y) {
      const todoindex = { id: this.id, type: 'Todolist', x: x, y: y }
      console.log('in ToDoClick', todoindex)
      this.$emit('pick-data', todoindex)
    }
  }
}
</script>
<style scoped>
.app {
  width: 100vw;
  min-height: 100vh;
  background: #F3F3F3;
  color: #15202B;
}
.dark li {
  background: #243a4e;
  color: #F3F3F3;
}
.dark button{
  background: #084885;
  color: #F3F3F3;
}
.dark div{
  background: #2a3e52;
  color: #F3F3F3;
}
.dark input{
  background: #5d768f;
  color: #361717;
}
.dark {
  color: white;
}
</style>
