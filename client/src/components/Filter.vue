<script setup>
import { ref, onMounted } from '@vue/runtime-core'

defineProps({
  selected: String,
  datalist: Array
})

const isActive = ref(false)

const activeControl = () => {
  isActive.value = !isActive.value
}

onMounted(() => {
  document.body.addEventListener('click', () => {
    isActive.value = false
  })
})

</script>


<template>
  <div class="filter" :class="{ active: isActive }" @click.stop="activeControl">
    <div class="selected">
      <div class="inner">
        <i class="icon-filter"></i>
        <span class="text">{{ selected }}</span>
      </div>
    </div>
    <div class="datalist">
      <ul>
        <li
          v-for="(li, index) in datalist"
          :key="index"
          @click="$emit('changeSelected', li)"
        >
          {{ li }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
@import ./../assets/sass/mixin

// filter
.filter
  position: relative
  font-size: px(14)
  &.active
    .selected, .datalist
      box-shadow: 5px 5px 5px rgba(0, 0, 0, .2)
    .datalist
      opacity: 1
      transform: translate(0)
      pointer-events: auto
  .selected
    display: flex
    justify-content: space-between
    align-items: center
    min-height: 40px
    min-width: 160px
    font-size: px(14)
    letter-spacing: .02em
    font-weight: 300
    color: var(--dark-gray)
    padding: 10px 20px
    border: 1px solid var(--dark-white)
    background-color: #fff
    cursor: pointer
    transition: box-shadow var(--trans-m)
    &::after
      font-family: 'icomoon'
      content: '\e903'
      font-size: 12px
      margin-left: 10px
    .inner
      display: flex
      align-items: center
      justify-content: center
    .icon-filter
      font-size: 18px
      margin-right: 5px
  .datalist
    position: absolute
    z-index: 2
    top: 100%
    left: 0
    width: 100%
    opacity: 0
    transform: translate(0, -20px)
    pointer-events: none
    transition: opacity var(--trans-m), transform var(--trans-m), box-shadow var(--trans-m)
    ul
      padding: 5px 0
      border: 1px solid var(--dark-white)
      border-top: none
      background-color: #fff
    li
      font-size: px(14)
      font-weight: 300
      letter-spacing: .02em
      color: var(--dark-gray)
      padding: 12px 20px
      cursor: pointer
      transition: background-color var(--trans-m)
      &:hover
        background-color: var(--dark-white)

</style>