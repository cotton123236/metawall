<script setup>
import { ref } from '@vue/runtime-core'
import { storeToRefs } from 'pinia'
import { useStore } from '../stores/stores'
import Header from './../components/Header.vue'
import Navigation from './../components/Navigation.vue'
import ModalPost from './../components/ModalPost.vue'
import ModalLoader from './../components/ModalLoader.vue'


// ModalPost control
const store = useStore()

const { useModalPost, useModalLoader } = storeToRefs(store)

</script>

<template>
  <div class="main-wrapper">
    <!-- header -->
    <Header />
    <!-- main -->
    <main class="mw-1200">
      <!-- nav -->
      <div class="nav-wrap">
        <Navigation />
      </div>
      <!-- view -->
      <div class="main-content">
        <router-view></router-view>
      </div>
      <!-- modal -->
      <Transition name="clip">
        <ModalPost v-if="useModalPost" />
      </Transition>
      <Transition name="fade">
        <ModalLoader v-if="useModalLoader" />
      </Transition>
    </main>
  </div>
</template>

<style lang="sass">
// main
main
  display: flex
  padding-top: 110px
  
  .main-content
    flex: 1
    padding-left: 20px
    padding-right: 20px
  .nav-wrap
    width: 350px

.fade-enter-active,
.fade-leave-active
  transition: opacity var(--trans-m)

.fade-enter-from,
.fade-leave-to
  opacity: 0

.clip-enter-from,
.clip-leave-to
  opacity: 0
  transition: opacity var(--trans-m) var(--trans-s)
  .modal
    opacity: 0
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0)
    transition: opacity .6s, clip-path .6s

.clip-enter-to,
.clip-leave-from
  opacity: 1
  transition: opacity var(--trans-xl)
  .modal
    opacity: 1
    clip-path: polygon(0 0, 100% 0, 100% 115%, 0 100%)
    transition: opacity .6s var(--trans-s), clip-path .6s var(--trans-s)

</style>