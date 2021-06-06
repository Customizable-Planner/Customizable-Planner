<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="$router.push({name: 'Home'})">
      to home
    </v-btn>
    <v-btn @click="$router.push({name: 'practice'})">
      show todo list
    </v-btn>
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>
