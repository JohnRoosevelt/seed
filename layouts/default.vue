<script setup lang="ts">
import { appId, appName } from '~/constants'

const _name = appName
const _appId = appId
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

let _showInstall = $ref(false)
let _installPrompt: any = null
onMounted(async () => {
  const relatedApps = await navigator.getInstalledRelatedApps()

  // Search for a specific installed platform-specific app
  const psApp = relatedApps.find(app => app.id === _appId)

  if (psApp) {
    // Update UI as appropriate
    _showInstall = false
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    console.log('install before')
    event.preventDefault()
    _installPrompt = event
    _showInstall = true
  })
  window.addEventListener('appinstalled', () => {
    console.log('install after')
    _installPrompt = null
    _showInstall = false
  })
})

async function _install() {
  console.log('install .....', _installPrompt)
  if (!_installPrompt)
    return

  const result = await _installPrompt.prompt()
  console.log(`Install prompt was: ${result.outcome}`)
}
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
    NuxtLink(to="/" replace).flex-cc.gap-1
      .i-icon-logo.text-5xl
      .hidden(md="block").text-2xl {{_name}}
    ClientOnly
      .text-base.flex-cc.gap-1(v-if="_showInstall" @click="_install")
        span install
        .i-carbon-app.text-3xl
      NuxtLink(to="/bible" replace v-else).text-base.flex-cc.gap-1
        span Go to use
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
