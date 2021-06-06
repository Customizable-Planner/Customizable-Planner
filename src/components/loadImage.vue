<template>
    <v-card> <!-- 이미지 삽입 버튼(이걸로 구현했음) -->
            <v-file-input v-model="insertedImage" />
            <v-img :src="url" />
          </v-card>
</template>

<script>
export default ({
  data () {
    return {
      insertedImage: null
    }
  },
  computed: { // 왠지는 잘 모르겠는데 computed에다가 해야됨
  // 요거 참고해서 했음 https://stackoverflow.com/questions/60678840/vuetify-image-upload-preview
    url () {
      if (!this.insertedImage) return
      return URL.createObjectURL(this.insertedImage)
    }
  }
})
</script>
