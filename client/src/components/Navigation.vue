<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from './../stores/stores'

const store = useStore()
const { user } = storeToRefs(store)
</script>

<template>
  <nav>
    <div class="user-wrap">
      <div class="user-photo">
        <img :src="user.image" alt="user-photo">
      </div>
      <div class="user-name">{{ user.name }}</div>
    </div>
    <ul class="user-tools">
      <li>
        <i class="icon-add-square"></i>
        <span>新增貼文</span>
      </li>
      <li>
        <i class="icon-bell"></i>
        <span>追蹤名單</span>
      </li>
      <li>
        <i class="icon-like"></i>
        <span>收藏文章</span>
      </li>
    </ul>
  </nav>
</template>

<style lang="sass">
@import ./../assets/sass/mixin

// nav
nav
  position: sticky
  top: 110px
  right: 0

  .user-wrap
    display: flex
    align-items: center
    padding: 0 20px
  .user-photo
    width: 50px
    height: 50px
    border-radius: 50%
    overflow: hidden
    margin-right: 15px
    img
      +fit
  .user-name
    font-family: $code-font
    font-size: px(18)
    line-height: 1.5
    color: var(--gray)

  .user-tools
    margin-top: 40px
    // padding-left: 20px
    li
      display: flex
      align-items: center
      color: var(--dark-gray)
      padding: 15px 20px
      transition: background var(--trans-m)
      // border-radius: 4px
      &:hover
        background-color: var(--dark-white)
      i
        // display: flex
        // justify-content: center
        // align-items: center
        // width: 50px
        font-size: px(20)
        margin-right: 25px
      span
        font-size: px(14)
</style>