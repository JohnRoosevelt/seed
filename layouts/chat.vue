<template lang="pug">
main.min-h-screen.flex-cc.flex-col
  .flex-1.w-full
    slot
  .w-full.flex-bc.text-4xl.h72px.px3.fixed.bottom-0(
    class="backdrop-blur-[3px] bg-gray-200/[.7]"
  )
    NuxtLink(to="/chat" replace active-class="text-blue-600").flex-cc.flex-col.flex-1
      .i-carbon-chat.text-4xl
      .text-xs.uppercase 消息
    NuxtLink(to="/chat/group" replace active-class="text-blue-600").flex-cc.flex-col.flex-1
      .i-carbon-group-presentation.text-4xl
      .text-xs.uppercase 群
  //- .w-full.overflow-y-scroll.custom-noscrollbar(class="h-[calc(100vh-72px)]")
  .w-full.h72px
</template>
