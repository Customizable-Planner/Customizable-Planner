<template>
    <v-container>
        <v-file-input v-model="insertedImage"></v-file-input>
        <v-img :src="url" />
    </v-container>
</template>

<script>
export default {
  name: 'image-insert-module',
  data: function () {
    return {
      insertedImage: null // 이미지 삽입을 위한 변수
    }
  },
  computed: {
    url () {
      if (!this.insertedImage) return
      return URL.createObjectURL(this.insertedImage)
    }
  }
}
</script>
