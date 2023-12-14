<script setup lang="ts">
import { appId, appName } from '~/constants'

const _name = appName
const _appId = appId

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
</script>

<template>
  <main min-h-screen flex-cc flex-col>
    <div sticky top-0 z-9 h72px w-full flex-bc px3 class="bg-gray-50/[.7] backdrop-blur-[3px]">
      <NuxtLink to="/" replace flex-cc gap-1>
        <div i-icon-logo text-5xl />
        <div hidden text-2xl md="block">
          {{ _name }}
        </div>
      </NuxtLink>
      <ClientOnly>
        <div v-if="_showInstall" v-motion="_motion" to="/install" flex-cc gap-1 text-base @click="_install">
          <span i-carbon-connect-target rotate-90 text-3xl />
          <span> 下载安装 </span>
        </div>
        <NuxtLink v-motion="_motion" to="/install" flex-cc gap-1 text-base>
          <span i-carbon-connect-target rotate-90 text-3xl />
          <span> 下载安装 </span>
        </NuxtLink>
      </ClientOnly>
    </div>

    <div w-full flex-1 flex-col bg-gray-100 space-y-1px>
      <slot />
    </div>

    <div h72px w-full />
    <AppTabs />
  </main>
</template>
