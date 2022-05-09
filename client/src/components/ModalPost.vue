<script setup>
import { inject, ref } from '@vue/runtime-core'
import { storeToRefs } from 'pinia'
import { useStore } from './../stores/stores'

const axios = inject('axios')
const store = useStore()
const { user } = storeToRefs(store)

const postUrl = '/api/posts'

// post data handler
const postContent = ref('')

const postNewPost = async () => {
  if (!postContent.value) return;
  const data = {
    content: postContent.value,
    user: user.value._id
  }
  const res = await axios.post(postUrl, data)
  // console.log(res)
}
</script>

<template>
  <div class="modal-wrapper modal-post">
    <div class="modal-content">
      <div class="modal">
        <div class="modal-head">
          <span>新增貼文</span>
        </div>
        <div class="modal-body">
          <div class="info">
            <div class="headshot">
              <img :src="user.image" alt="user-photo">
            </div>
            <div class="name">{{ user.name }}</div>
          </div>
          <div class="content">
            <textarea placeholder="在想些什麼呢？" v-model="postContent"></textarea>
          </div>
        </div>
        <div class="modal-foot">
          <div class="submit-btn" @click="postNewPost">發布貼文</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import ./../assets/sass/mixin

// modal-post
.modal
  width: 90%
  max-width: 600px
  // border-radius: 8px
  background-color: #fff
  margin: auto
  .modal-head
    position: relative
    font-size: px(14)
    line-height: 1.5
    padding: 20px
    text-align: center
    &::after
      position: absolute
      content: ''
      display: block
      width: calc(100% - 40px)
      height: 1px
      left: 20px
      bottom: 0
      background-color: var(--dark-white)
  .modal-body
    padding: 20px 40px
    .info
      display: flex
      align-items: center
    .headshot
      width: 50px
      height: 50px
      border-radius: 50%
      overflow: hidden
      margin-right: 15px
      img
        +fit
    .name
      font-family: $code-font
      line-height: 1.5
    textarea
      resize: none
      width: 100%
      min-height: 15vh
      font-family: $basic-font
      font-size: px(14)
      line-height: 1.5
      letter-spacing: .02em
      font-weight: 300
      color: var(--gray)
      border: none
      padding: 20px 0
  .modal-foot
    padding: 20px
  
</style>