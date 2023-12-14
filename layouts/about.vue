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
  try {
    const relatedApps = await navigator.getInstalledRelatedApps()
    const psApp = relatedApps.find((app: { id: string }) => app.id === _appId)
    if (psApp)
      _showInstall = false
  }
  catch (error) {
    Logger.trace(error)
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    Logger.log('install before')
    event.preventDefault()
    _installPrompt = event
    _showInstall = true
  })
  window.addEventListener('appinstalled', () => {
    Logger.log('install after')
    _installPrompt = null
    _showInstall = false
  })
})

async function _install() {
  Logger.log('install .....', _installPrompt)
  if (!_installPrompt)
    return

  const result = await _installPrompt.prompt()
  Logger.log(`Install prompt was: ${result.outcome}`)
}

const _motion = {
  initial: {
    x: 3,
  },
  enter: {
    x: 0,
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 1000,
      repeatType: 'loop',
    },
  },
}
</script>

<template>
  <main min-h-screen flex-cc flex-col>
    <div sticky top-0 h72px w-full flex-bc px3 class="bg-gray-200/[.7] backdrop-blur-[3px]">
      <NuxtLink to="/" replace flex-cc gap-1>
        <div i-icon-logo text-5xl />
        <div hidden text-2xl md="block">
          {{ _name }}
        </div>
      </NuxtLink>
      <ClientOnly>
        <div v-if="_showInstall" flex-cc gap-1 text-base @click="_install">
          <span> install </span>
          <span v-motion="_motion" i-carbon-app text-3xl />
        </div>
        <NuxtLink v-else to="/bible" replace>
          <span> Go to use </span>
          <span v-motion="_motion" i-carbon-connect-target text-3xl />
        </NuxtLink>
      </ClientOnly>
    </div>

    <div w-full flex-1>
      <slot />
    </div>

    <div p7 />

    <div fixed bottom-5 flex-bc gap-10 px-5 py-3 text-sm uppercase text-white class="rounded-[1rem] bg-gray-600/[.4] backdrop-blur-[15rem]">
      <NuxtLink to="/" replace active-class="border-b">
        why
      </NuxtLink>
      <NuxtLink to="/what" replace active-class="border-b">
        what
      </NuxtLink>
      <NuxtLink to="/who" replace active-class="border-b">
        who
      </NuxtLink>
    </div>
  </main>
</template>
