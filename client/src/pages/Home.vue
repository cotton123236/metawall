<script setup>
import { inject, ref, reactive } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStore } from './../stores/stores'
import Filter from './../components/Filter.vue'
import Posts from './../components/Posts.vue'


const axios = inject('axios')
const route = useRoute()
const router = useRouter()
const store = useStore()

const { posts } = storeToRefs(store)
const { setPost } = store

const postUrl = '/api/posts'


// append
const appendQuery = async (newQuery) => {
  // create query
  const key = Object.keys(newQuery)[0]
  const value = newQuery[key]
  const query = Object.assign({}, route.query, newQuery)
  if (!value) delete query[key]
  // push query
  await router.push({ query })
}

// post handler
const getPosts = async () => {
  // create url from query
  const { query } = route
  const keys = Object.keys(query)
  let url = postUrl
  keys.forEach((key, i) => {
    if (i === 0) url += `?${key}=${query[key]}`
    else url += `&${key}=${query[key]}`
  })
  // axios data
  const res = await axios.get(url)
  if (!res.data) return;
  setPost(res.data.data)
  console.log(posts.value)
}

getPosts()


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
  await appendQuery({ sort })
  // then get data
  getPosts()
}


// search content handler
const searchInput = ref(null)

const searchContent = async ($event) => {
  const { value } = $event.target
  // push query
  await appendQuery({
    content: value
  })
  // then get data
  getPosts()
}

const clearInput = () => {
  searchInput.value.value = ''
}

</script>

<template>
  <section>
    <!-- post-tools -->
    <div class="post-tools">
      <label class="post-search">
        <input type="text" placeholder="搜尋貼文" ref="searchInput" @keyup.enter="searchContent">
        <i class="icon-search"></i>
        <i class="icon-cancel" @click="clearInput"></i>
      </label>
      <Filter
        :selected="filterSelected"
        :datalist="filterDatalist"
        @change-selected="changeSort"
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