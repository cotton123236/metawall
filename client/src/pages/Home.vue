<script setup>
import { inject, reactive } from '@vue/runtime-core'
import Filter from './../components/Filter.vue'
import Posts from './../components/Posts.vue'

const axios = inject('axios')

const url = '/api/posts'

// filter handler
const filter = reactive({
  selected: '最新貼文',
  datalist: ['最新貼文', '最舊貼文' , '最熱門貼文']
})

const changeSelected = (li) => {
  filter.selected = li
}

// post handler
const posts = reactive([])

axios.get(url).then(res => {
  if (!res.data) return;
  const { data } = res.data
  Object.assign(posts, data)
  console.log(posts)
})
</script>

<template>
  <section>
    <!-- post-tools -->
    <div class="post-tools">
      <label class="post-search">
        <input type="text" placeholder="搜尋貼文">
        <i class="icon-search"></i>
        <i class="icon-cancel"></i>
      </label>
      <Filter
        :selected="filter.selected"
        :datalist="filter.datalist"
        @change-selected="changeSelected"
      />
    </div>
    <!-- post-content -->
    <div class="post-content">
      <template v-if="posts.length">
        <Posts
          v-for="post in posts"
          :key="post._id"
          :post="post"
        />
      </template>
      <div class="no-post" v-else>
        目前尚無動態，試著新增一則動態吧！
      </div>
    </div>
  </section>
</template>

<style lang="sass">
@import ./../assets/sass/mixin

// post-tools
.post-tools
  display: flex
  // .post-filter

  .post-search
    flex: 1
    position: relative
    display: flex
    align-items: center
    height: 40px
    background-color: var(--dark-white)
    padding: 10px 20px
    margin-right: 10px
    overflow: hidden
    input[type="text"]
      width: 100%
      border: none
      background: none
      font-family: $basic-font
      font-size: px(14)
      letter-spacing: .02em
      font-weight: 300
      color: var(--gray)
      padding-left: 20px
      transition: padding var(--trans-s)
      &::placeholder
        color: #ccc
      &:focus
        padding-left: 0
        padding-right: 10px
        & + .icon-search
          opacity: 0
          transform: translate(-20px, -50%)
        & ~ .icon-cancel
          opacity: 1
          transform: translate(0, -50%)
          pointer-events: auto
    .icon-search, .icon-cancel
      position: absolute
      top: 50%
      transform: translate(0 ,-50%)
      transition: transform var(--trans-s), opacity var(--trans-s)
    .icon-search
      transform: translate(0 ,-50%)
      left: 20px
      color: #ccc
    .icon-cancel
      opacity: 0
      right: 5px
      color: var(--gray)
      transform: translate(20px ,-50%)
      padding: 5px
      cursor: pointer
      pointer-events: none

.post-content
  padding-bottom: 40px
  .no-post
    font-size: px(14)
    text-align: center
    color: var(--light-gray)
    border-radius: 8px
    border: 1px solid var(--dark-white)
    background-color: #fff
    padding: 80px 30px
    margin-top: 20px

</style>