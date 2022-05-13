<script setup>
import { reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStore } from './../stores/stores'
import Filter from './../components/Filter.vue'
import Searcher from './../components/Searcher.vue'


const { VITE_API_URL } = import.meta.env
const store = useStore()
const route = useRoute()
const { user } = storeToRefs(store)
const { appendQuery, getPosts } = store

const postUrl = `${VITE_API_URL}/api/posts`


// filter handler
const filterDatalist = reactive([
  {
    name: '最新貼文',
    sort: undefined
  },
  {
    name: '最舊貼文',
    sort: 'timeasc'
  },
  {
    name: '最熱門貼文',
    sort: 'hot'
  },
])
const selectedIndex = filterDatalist.findIndex(item => item.sort === route.query.sort)
const filterSelected = reactive({
  name: filterDatalist[selectedIndex].name,
  sort: route.query.sort
})

const changeSort = async (li) => {
  if (li.name === filterSelected.name) return;
  Object.assign(filterSelected, li)
  const { sort } = li
  // push query
  await appendQuery(route, { sort })
  // then get data
  getPosts(route, postUrl)
}

</script>

<template>
  <header class="space-lr">
    <div class="container mw-1200">
      <!-- logo -->
      <router-link class="logo" to="/">MetaWall</router-link>
      <!-- searcher -->
      <Searcher />
      <div class="tools">
        <Filter />
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
  padding-top: 15px
  padding-bottom: 15px
  box-shadow: 0 0 15px rgba(0, 0, 0, .2)
  background-color: #fff

  .container
    display: flex
    // justify-content: space-between
    align-items: center

  .logo
    font-family: $title-font
    // font-weight: 600
    font-size: px(24)

  .searcher
    margin-left: 20px

  .tools
    display: flex
    align-items: center
    margin-left: auto
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