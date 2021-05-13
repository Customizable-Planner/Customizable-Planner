<template>
<v-container fluid>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title>일기장</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="editMode = !editMode">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-text-field laber="제목" v-model="form.title"></v-text-field>
      <v-text-field v-model="form.content"></v-text-field>
    </v-card-text>
    <v-card-actions>
       <v-spacer></v-spacer>
      <v-btn @click="fileImport">fileImport</v-btn>
      <v-btn @click="fileExport">fileExport</v-btn>
      <v-btn @click="dbRead">Read</v-btn>
      <v-btn @click="dbWrite">Write</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>
<script>
const { dialog } = require('electron').remote
const fs = require('fs')
var Datastore = require('nedb-promises')
var db = new Datastore()

export default {
  data () {
    return {
      editMode: true,
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    fileImport () {
      const options = {
        filters: [
          {
            name: 'text and markdown',
            extensions: ['txt', 'md']
          }
        ]
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.form.content = fs.readFileSync(r[0])
    },
    fileExport () {
      const options = {
        filters: [
          {
            name: 'text and markdown',
            extensions: ['txt', 'md']
          }
        ]
      }
      const r = dialog.showSaveDialogSync(options)
      if (!r) return
      fs.writeFileSync(r, this.form.content)
    },
    async dbRead () {
      const rs = await db.findOne()
      console.log(rs)
    },
    async dbWrite () {
      const r = await db.insert(this.form)
      console.log(r)
    }
  }
}
</script>