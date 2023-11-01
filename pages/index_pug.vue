<script setup lang="ts">
const online = useOnline()
</script>

<template lang="pug">
div
  Logos(mb-6) /
  Suspense
    ClientOnly
      PageView(v-if="online")
    template(#fallback)
      div(italic op50)
        <span animate-pulse>Loading...</span>

  InputEntry /
  p {{ online }}
</template>
