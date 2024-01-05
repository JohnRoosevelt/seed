<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { info: user } = $(useAccountStore())
const router = useRouter()
if (!user.id)
  router.replace('/user/login')

// onMounted(() => {
//   WS.connect('test')
//   setInterval(() => {
//     WS.send({ type: 'DATA', dst: 'a', payload: 'abc' })
//   }, 3000)
// })
</script>

<template lang="pug">
main.min-h-screen.flex-cc.flex-col
  AppHeader
  .w-full.flex-1.flex-col.bg-gray-100.space-y-1px
    mixin item(url, name, time,text, isGroup)
      .w-full.bg-white.flex-bc.p-4(@click="$router.push('/blank')")
        if isGroup
          .i-carbon-group-presentation.text-4xl
        else
          .i-carbon-user-avatar.text-4xl
        .flex-col.flex-1.ml-2
          .flex-bc.text-xs
            .text-base= name
            .text-gray= time
          .flex.text-gray.text-sm= text

    - for (var x = 0; x < 3; x++)
      +item('', '群聊名称', 'time', '最后一条消息内容  ... ', true)

    - for (var x = 0; x < 20; x++)
      +item('', '好友昵称', 'time', '最后一条消息内容  ... ', false)
  .w-full.h72px
  AppTabs
</template>
