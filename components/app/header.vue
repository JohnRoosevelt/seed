<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { appId, appName } from '~/constants'

const _name = appName
const _appId = appId

let showInstall = $ref(false)
let installPrompt: any = null
onMounted(async () => {
  try {
    const relatedApps = await navigator.getInstalledRelatedApps()
    const psApp = relatedApps.find((app: { id: string }) => app.id === _appId)
    if (psApp)
      showInstall = false
  }
  catch (error) {
    Logger.trace(error)
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    Logger.log('install before')
    event.preventDefault()
    installPrompt = event
    showInstall = true
  })
  window.addEventListener('appinstalled', () => {
    Logger.log('install after')
    installPrompt = null
    showInstall = false
  })
})

async function _install() {
  Logger.log('install .....', installPrompt)
  if (!installPrompt)
    return

  const result = await installPrompt.prompt()
  Logger.log(`Install prompt was: ${result.outcome}`)
}

const _motion = {
  initial: {
    y: 3,
  },
  enter: {
    y: 0,
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 1000,
      repeatType: 'loop',
    },
  },
}

let showPlus = $ref(false)
const target = ref(null)
onClickOutside(target, () => {
  showPlus = false
})
</script>

<template>
  <div sticky top-0 z-9 h72px w-full flex-bc px3 class="bg-gray-50/[.7] backdrop-blur-[3px]">
    <NuxtLink to="/" replace flex-cc gap-1>
      <div i-icon-logo text-5xl />
      <div hidden text-2xl md="block">
        {{ _name }}
      </div>
    </NuxtLink>

    <div v-if="showInstall" v-motion="_motion" to="/install" flex-cc gap-1 text-base @click="_install">
      <span i-carbon-connect-target rotate-90 text-3xl />
      <span> 下载安装 </span>
    </div>
    <div v-else relative @click="showPlus = true">
      <span i-carbon-add-large rotate-90 text-3xl />
      <div v-if="showPlus" ref="target" absolute right-0 z-8 w-36 rounded-md bg-white p-4 shadow-md space-y-4>
        <div flex-cc space-x-2 @click="$router.push('/user/add')">
          <span i-carbon-user-follow text-2xl />
          <span>加好友/群</span>
        </div>
        <div flex-cc text-gray space-x-2 @click="tip('此功能限制使用')">
          <span i-carbon-chat text-2xl />
          <span>创建群聊</span>
        </div>
      </div>
    </div>
  </div>
</template>
