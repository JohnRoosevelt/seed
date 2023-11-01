<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html::-webkit-scrollbar {
  display: none;
}

html.dark {
  background: #222;
  color: white;
}

a {
  -webkit-tap-highlight-color:rgba(255,255,255,0);
}
</style>
