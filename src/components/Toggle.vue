<template>
    <div>
        <v-row
        dense
        align="center">
            <v-switch
            v-model="switchMode"
            @click="$emit('toggle')"
            ></v-switch>
            <h1 v-if="switchMode" style="margin: 10px; color: white">Dark</h1>
            <h1 v-else style="margin: 10px; color: black">App</h1>
        </v-row>
    </div>
</template>
<script>
export default {
  props: ['mode'],
  data: () => ({
    switchMode: false
  }),
  computed: {
    messages () {
      return this.switchMode ? ['dark'] : ['app']
    }
  }
}
</script>
<style scoped>
.toggle {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}
.toggle input{
    opacity: 0;
    width: 0;
    height: 0;
}
.toggler {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #15202B;
    transition: 0.4s;
}
.toggler:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background: #FFF;
    transition: 0.4s;
}
input:checked + .toggler {
    background: #2196F3;
}
input:focus + toggler {
    box-shadow: 0 0 2px #2196F3;
}
input:checked +.toggler:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}
.toggler.round {
    border-radius: 34px;
}
.toggler.round:before{
    border-radius: 50%;
}
</style>
