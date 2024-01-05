<script setup lang="ts">
definePageMeta({
  layout: 'user',
})
const { info: user } = $(useAccountStore())
const router = useRouter()
if (!user.id)
  router.replace('/user/login')
</script>

<template lang="pug">
.w-full.bg-white.flex-col.px-6.pt-16.pb-6(@click="$router.push('/blank')")
  .flex-bc.space-x-4
    .i-carbon-user-avatar.text-6xl
    .flex-col.flex-1
      .text-3xl {{user.name}}
      .text-gray id: {{user.id}}

NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
  .flex-cc.space-x-4
    .i-carbon-connect-target.rotate-90.text-red600.text-2xl
    .block 下载安装
  .i-carbon-chevron-right.text-2xl.text-gray.font-bold

.w-full.flex-col.space-y-1px
  NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
    .flex-cc.space-x-4
      .i-carbon-phone.text-2xl
      .block 反馈建议
    .i-carbon-chevron-right.text-2xl.text-gray.font-bold

  NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
    .flex-cc.space-x-4
      .i-carbon-bee-bat.text-2xl
      .block 贡献加入
    .i-carbon-chevron-right.text-2xl.text-gray.font-bold

  NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
    .flex-cc.space-x-4
      .i-carbon-car.text-2xl
      .block 其它入口
    .i-carbon-chevron-right.text-2xl.text-gray.font-bold

NuxtLink(to="/blank").w-full.flex-bc.bg-white.px-6.py-4
  .flex-cc.space-x-4
    .i-carbon-favorite.text-2xl.text-blue600
    .block 关于
  .i-carbon-chevron-right.text-2xl.text-gray.font-bold
</template>
