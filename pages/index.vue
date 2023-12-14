<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template lang="pug">
mixin item(url, name, time,text, isGroup)
  .w-full.bg-white.flex-bc.p-4(@click="$router.push('/blank')")
    if isGroup
      .i-carbon-group-presentation.text-4xl
    else
      .i-carbon-user-avatar.text-4xl
    .flex-col.flex-1.ml-2
      .flex-bc.text-xs
        .text-xl= name
        .text-gray= time
      .flex.text-gray= text
- for (var x = 0; x < 3; x++)
  +item('', '群聊名称', 'time', '最后一条消息内容  ... ', true)

- for (var x = 0; x < 20; x++)
  +item('', '好友昵称', 'time', '最后一条消息内容  ... ', false)
</template>
