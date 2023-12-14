<script setup lang="ts">
definePageMeta({
  layout: 'user',
})
</script>

<template lang="pug">
.w-full.bg-white.flex-col.px-6.pt-16.pb-6(@click="$router.push('/blank')")
  .flex-bc.space-x-4
    .i-carbon-user-avatar.text-6xl
    .flex-col.flex-1
      .text-3xl name
      .text-gray id: xxxxxxxxxx

NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
  .flex-cc.space-x-4
    .i-carbon-car.text-2xl
    .block 关于
  .i-carbon-chevron-right.text-2xl.text-gray.font-bold

.w-full.flex-col.space-y-1px
  NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
    .flex-cc.space-x-4.text-xl
      .i-carbon-car.text-2xl
      .block abc
    .i-carbon-chevron-right.text-2xl.text-gray.font-bold

  NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
    .flex-cc.space-x-4.text-xl
      .i-carbon-car.text-2xl
      .block abc
    .i-carbon-chevron-right.text-2xl.text-gray.font-bold

  NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
    .flex-cc.space-x-4.text-xl
      .i-carbon-car.text-2xl
      .block abc
    .i-carbon-chevron-right.text-2xl.text-gray.font-bold

  NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
    .flex-cc.space-x-4.text-xl
      .i-carbon-car.text-2xl
      .block abc
    .i-carbon-chevron-right.text-2xl.text-gray.font-bold

NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
  .flex-cc.space-x-4
    .i-carbon-car.text-2xl
    .block 关于
  .i-carbon-chevron-right.text-2xl.text-gray.font-bold
</template>
