<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from './../stores/stores'

const store = useStore()
const { user } = storeToRefs(store)
</script>

<template>
  <header class="space-lr">
    <div class="container mw-1200">
      <router-link class="logo" to="/">MetaWall</router-link>
      <div class="user-wrap">
        <!-- <div class="user-name">Wilson</div> -->
        <div class="user-photo">
          <img :src="user.image" alt="user-photo">
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="sass">
@import ./../assets/sass/mixin

header
  position: fixed
  z-index: 9
  top: 0
  left: 0
  width: 100%
  padding-top: 20px
  padding-bottom: 20px
  box-shadow: 0 0 20px rgba(0, 0, 0, .2)
  background-color: #fff

  .container
    display: flex
    justify-content: space-between
    align-items: center

  .logo
    font-family: $title-font
    // font-weight: 600
    font-size: px(24)

  .user-wrap
    display: flex
    align-items: center
  .user-photo
    width: 30px
    height: 30px
    border-radius: 50%
    overflow: hidden
    // margin-left: 5px
    img
      +fit
  .user-name
    font-family: $code-font
    color: var(--gray)
</style>