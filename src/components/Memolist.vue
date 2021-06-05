<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-textarea
          outlined
          name="input-7-4"
          label="Memo"
          value="write your memo"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'memolist',
  props: ['mode']
}
</script>

<style>
textarea {
  background: #c3c3c3;
}
.dark textarea {
    background: #15202B;
    color: #c3c3c3;
}
</style>
