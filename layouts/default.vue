<script setup lang="ts">
import { appName } from '~/constants'

// const top = ref<HTMLElement | null>(null)
// let opacity = $(useCssVar('--un-bg-opacity', top))
// let blur = $(useCssVar('--blur', top))

// onMounted(() => {
//   window.onscroll = () => {
//     nextTick(() => {
//       if (window.scrollY > 2) {
//         opacity = 0.7
//         blur = '3px'
//       }
//       else {
//         opacity = 0
//         blur = '0px'
//       }
//     })
//   }
// })
</script>

<template lang="pug">
main.min-h-screen.flex-cc.flex-col
  //- .w-full.flex-bc.text-4xl.h72px.px3.sticky.top-0.bg-white(
  //-   ref="top"
  //-   style="--un-bg-opacity: 0; --blur: 0px; backdrop-filter: blur(var(--blur));"
  //- )
  .w-full.flex-bc.h72px.px3.sticky.top-0(
    class="backdrop-blur-[3px] bg-gray-200/[.7]"
  )
    NuxtLink(to="/").flex-cc.gap-1
      .i-icon-logo.text-5xl
      .hidden(md="block").text-2xl {{appName}}
    NuxtLink(to="/bible").flex-cc.gap-1
      .text-base Go to use
      .i-carbon-connect-target.text-3xl

  .flex-1.w-full
    slot
  .p-7

  .fixed.bottom-5.flex-bc.gap-10.px-5.py-3.text-white.text-sm.uppercase(
    class="backdrop-blur-[15rem] bg-gray-600/[.4] rounded-[1rem]"
  )
    //- NuxtLink(to="/" custom v-slot="{href, navigate, isActive}")
    //-   p(@click="navigate" :class="[isActive? 'border-b bg-none': '']") what
    NuxtLink(to="/" active-class="border-b") why
    NuxtLink(to="/what" activeClass="border-b") what
    NuxtLink(to="/who" activeClass="border-b") who
</template>
