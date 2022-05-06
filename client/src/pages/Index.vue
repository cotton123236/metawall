<script setup>
import Header from './../components/Header.vue'
import Navigation from './../components/Navigation.vue'
</script>

<template>
  <Header />
  <main class="mw-1200">
    <div class="nav-wrap">
      <Navigation />
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </main>
</template>

<style lang="sass">
// main
main
  display: flex
  padding-top: 110px
  
  .main-content
    flex: 1
    padding-left: 20px
    padding-right: 20px
  .nav-wrap
    width: 350px
</style>