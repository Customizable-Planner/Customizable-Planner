<template>
  <div :class="mode" v-on:mouseup="imageClick">
    <button v-on:click="$emit('del-data', item._id)">
      <v-icon color="red">mdi-trash-can-outline</v-icon>
    </button>
    <v-card max-height="400px" max-width="400px">
    <v-img :src="imageurl" />
    </v-card>
  </div>
</template>

<script>
// const Datastore = require('nedb-promises')
// const imagedb = Datastore.create('/path/to/image.db') // size, id
export default ({
  name: 'Image',
  props: ['item'],
  data () {
    return {
      insertedImage: null,
      imageurl: null,
      inn: true
    }
  },
  watch: {
    async item () {
      this.imageurl = this.item.url
    }
  },
  async mounted () {
    console.log('idid', this.item)
    this.imageurl = this.item.url
  },
  methods: {
    imageClick (x, y) {
      const imageindex = { id: this.item._id, type: 'Image', x: x, y: y }
      console.log('in imageClick', imageindex)
      this.$emit('pick-data', imageindex)
    }
  }
})
</script>
