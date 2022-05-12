import { defineStore } from 'pinia'
import axios from 'axios'
import router from './../router/router'

export const useStore = defineStore('main', {
  state: () => {
    return {
      user: {},
      posts: [],
      useModalPost: false,
      useModalLoader: false
    }
  },
  actions: {
    async getPosts(route, url) {
      const { query } = route
      const keys = Object.keys(query)
      // let url = route
      keys.forEach((key, i) => {
        if (i === 0) url += `?${key}=${query[key]}`
        else url += `&${key}=${query[key]}`
      })
      // axios data
      const res = await axios.get(url)
      if (!res.data) return;
      this.posts.length = 0
      Object.assign(this.posts, res.data.data)
      console.log(this.posts)
    },
    changeModalPostState() {
      this.useModalPost = !this.useModalPost
    },
    changeModalLoaderState() {
      this.useModalLoader = !this.useModalLoader
    },
    async appendQuery(route, newQuery) {
      // create query
      const key = Object.keys(newQuery)[0]
      const value = newQuery[key]
      const query = Object.assign({}, route.query, newQuery)
      if (!value) delete query[key]
      // push query
      await router.push({ query })
    }
  }
})

