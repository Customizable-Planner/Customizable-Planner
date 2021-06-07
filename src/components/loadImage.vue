<template>
    <v-card v-on:mouseup="imageClick"> <!-- 이미지 삽입 버튼(이걸로 구현했음) -->
      <v-file-input v-model="insertedImage" />
      <v-img :src="url" />
    </v-card>
</template>

<script>
const Datastore = require('nedb-promises')
const imagedb = Datastore.create('/path/to/image.db')
export default ({
  props: ['idd'],
  data () {
    return {
      insertedImage: null
    }
  },
  watch: {
    async insertedImage () {
      if (this.insertedImage) {
        imagedb.update({ id: this.idd }, { $set: { insertedImage: this.insertedImage } })
      }
      const im = await imagedb.find({ id: this.idd })
      console.log('imimimimimimim', im)
    },
    async idd () {
      const temp = await imagedb.find({ id: this.idd })
      this.insertedImage = temp.insertedImage
    }
  },
  async mounted () {
    // imagedb.remove({}, { multi: true })
    let temp = await imagedb.find({ id: this.idd })
    if (temp === []) {
      imagedb.insert({ id: this.idd })
    }
    temp = await imagedb.find({ id: this.idd })
    console.log('mounted   mounted   mounted   ', temp)
    this.insertedImage = temp.insertedImage
  },
  computed: { // 왠지는 잘 모르겠는데 computed에다가 해야됨
  // 요거 참고해서 했음 https://stackoverflow.com/questions/60678840/vuetify-image-upload-preview
    url () {
      if (!this.insertedImage) return
      return URL.createObjectURL(this.insertedImage)
    }
  },
  methods: {
    imageClick (x, y) {
      const imageindex = { id: this.idd, type: 'Image', x: x, y: y }
      console.log('in imageClick', imageindex)
      this.$emit('pick-data', imageindex)
    }
  }
})
</script>
