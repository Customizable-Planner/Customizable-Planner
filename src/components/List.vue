<template>
    <div>
        <v-card
         class='pa-3 mb-3'
         :class="{'done': list.status === 'done'}"
         v-for='(list, index) in todoList'
         :key="index"
        >
            <p>{{ list.memo }}</p>
            <p>{{list.status}}</p>
            <v-btn
            v-if="list.status === 'created'"
            @click="$emit('statusControl', index, 'done')"
            fab small outlined color="green"><v-icon>mdi-check</v-icon></v-btn>
            <v-btn
            v-else
            @click="$emit('statusControl', index, 'created')"
            fab small outlined color="blue"><v-icon>mdi-refresh</v-icon></v-btn>
            <v-btn
            @click="$emit('listDelete', index)"
            fab small outlined color="red"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
            <v-btn
            @click="listEdit(list.memo, index)"
            v-if="list.status === 'created'"
            fab small outlined color="orange"><v-icon>mdi-file-document-edit-outline</v-icon></v-btn>
        </v-card>
    </div>
</template>

<script>
import { eventBus } from '../main'
export default {
  props: ['todoList'],
  methods: {
    listEdit (memo, index) {
      eventBus.listEdit(memo, index)
    }
  }
}
</script>

<style scoped>
.done {
    background-color: rgba(0, 0, 0, 0.1);
}
.done p {
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.5);
}
</style>
