import { defineStore } from 'pinia'
import axios from 'axios'

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
    async setPosts(route, query) {
      const keys = Object.keys(query)
      let url = route
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
  }
})

