<script setup lang="ts">
const _online = useOnline()
</script>

<template lang="pug">
div
  Logos(mb-6) /
  Suspense
    ClientOnly
      PageView(v-if="_online")
      p(v-else) You're offline
    template(#fallback)
      div(italic op50)
        <span animate-pulse>Loading...</span>

  InputEntry /
</template>
