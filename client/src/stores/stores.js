import { defineStore } from 'pinia'

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
    setPost(data) {
      this.posts.length = 0
      Object.assign(this.posts, data)
    },
    changeModalPostState() {
      this.useModalPost = !this.useModalPost
    },
    changeModalLoaderState() {
      this.useModalLoader = !this.useModalLoader
    },
  }
})

