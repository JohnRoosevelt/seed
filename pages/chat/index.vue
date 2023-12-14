<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
</script>

<template lang="pug">
mixin item(url, name, time,text)
  .flex-bc.p-5
    .i-carbon-user-avatar.text-6xl
    .flex-col.flex-1.ml-5
      .flex-bc
        .text-2xl= name
        .text-gray= time
      .flex.text-gray= text

+item('', 'name', 'time', 'latest msg  ... ')
- for (var x = 0; x < 30; x++)
  +item('', 'name', 'time', 'latest msg  ... ')
</template>
