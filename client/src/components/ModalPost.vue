<script setup>
</script>

<template>
  <div class="modal-wrapper modal-post">
    <div class="modal-content">
      <div class="modal">
        <div class="modal-head">
          <span>新增貼文</span>
        </div>
        <div class="modal-body">
          <div class="headshot">
            <!-- <img :src="post.user.image" alt="user-photo"> -->
          </div>
          <div class="content">
            <textarea cols="30" rows="10" placeholder="在想些什麼呢？"></textarea>
          </div>
        </div>
        <div class="modal-foot">
          <div class="submit-btn">發布貼文</div>
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
  max-width: 800px
  border-radius: 8px
  background-color: #fff
  margin: auto
  .modal-head
    padding: 20px
    text-align: center
  .modal-body
    padding: 20px
    textarea
      resize: none
      width: 100%
      padding: 20px
      font-family: $basic-font
      font-size: px(14)
      letter-spacing: .02em
      font-weight: 300
      color: var(--gray)
      border: none
</style>