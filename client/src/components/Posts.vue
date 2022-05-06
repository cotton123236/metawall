<script setup>
const props = defineProps({
  post: Object
})

const timeDiff = {
  day: 86400000,
  hour: 3600000,
  minute: 60000
}

const useDateFormat = (date) => {

  const now = new Date()
  const time = new Date(date)
  const diff = now.getTime() - time.getTime()
  if (diff >= timeDiff.day) {
    const yyyy = time.getFullYear()
    const mm = String(time.getMonth() + 1).padStart(2, '0')
    const dd = String(time.getDate()).padStart(2, '0')
    return `${yyyy}/${mm}/${dd}`
  }
  else if (diff < timeDiff.day && diff >= timeDiff.hour) {
    const hours = now.getHours() - time.getHours()
    return `${hours} 小時前`
  }
  else if (diff < timeDiff.hour && diff >= timeDiff.minute) {
    const mins = now.getMinutes() - time.getMinutes()
    return `${mins} 分鐘前`
  }
  else {
    const secs = now.getSeconds() - time.getSeconds()
    return `${secs} 秒前`
  }
}

</script>

<template>
  <div class="each-post">
    <div class="info">
      <div class="headshot">
        <img :src="post.image" alt="user-photo">
      </div>
      <div class="detail">
        <div class="name">{{ post.user.name }}</div>
        <div class="date">{{ useDateFormat(post.createdAt) }}</div>
      </div>
      <div class="more-btn">
        <i class="icon-more"></i>
      </div>
    </div>
    <div class="text">
      <p v-html="post.content"></p>
    </div>
    <div class="tool">
      <div class="like">
        <i class="icon-like"></i>
      </div>
      <div class="commit">
        <i class="icon-commit"></i>
      </div>
      <div class="share">
        <i class="icon-share"></i>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import ./../assets/sass/mixin

// each-post
.each-post
  border: 1px solid var(--dark-white)
  border-radius: 8px
  background-color: #fff
  box-shadow: 0 0 5px rgba(0, 0, 0, .1)
  margin-top: 20px
  .info
    position: relative
    display: flex
    align-items: center
    padding: 20px 20px 0
  .headshot
    width: 50px
    height: 50px
    border-radius: 50%
    overflow: hidden
    margin-right: 15px
    img
      +fit
  .detail
    flex: 1
    font-family: $code-font
    .name
      font-size: px(16)
      line-height: 1.5
    .date
      font-size: px(12)
      color: #ccc
      line-height: 1.5
      margin-top: 2px
  .more-btn
    display: flex
    justify-content: center
    align-items: center
    width: 30px
    height: 30px
    border-radius: 50%
    cursor: pointer
    transition: background-color var(--trans-s)
    &:hover
      background-color: var(--dark-white)
    i
      font-size: 20px
  .text
    position: relative
    padding: 30px
    &::after
      position: absolute
      left: 20px
      width: calc(100% - 40px)
      height: 1px
      bottom: 0
      display: block
      content: ''
      background-color: var(--dark-white)
    p
      font-size: px(14)
      line-height: 1.5
      color: var(--dark-gray)
  .tool
    display: flex
    // padding: 0 20px
    > div
      width: 33.33%
      display: flex
      justify-content: center
      align-items: center
      padding: 15px
      cursor: pointer
      &:hover
        i
          color: var(--dark-gray)
    i
      font-size: 18px
      color: var(--light-gray)
      transition: color var(--trans-s)
</style>