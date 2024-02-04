<template lang="pug">
.w-full.h72px.flex-bc.px-2.sticky.top-0.bg-white.z-9
  span.i-carbon-chevron-left.text-2xl(@click="$router.back()")
  span
    slot
  span
</template>
