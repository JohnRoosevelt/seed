<script setup>
</script>

<template lang="pug">
main.min-h-screen.flex-cc.flex-col
  .w-full.flex-bc.px-4.fixed.z-9.top-0.h72px(class="bg-gray-50/[.7] backdrop-blur-[3px]")
    .flex-cc(@click="$router.back")
      .i-carbon-chevron-left.text-4xl.font-bold
      .text-xl 返回

  .w-full.h72px

  .flex-1.flex-col.w-full
    slot
</template>
