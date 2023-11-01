<template lang="pug">
main.min-h-screen.flex-cc.flex-col
  .flex-1.w-full
    slot
  .w-full.flex-bc.text-4xl.h72px.px3.fixed.bottom-0(
    class="backdrop-blur-[3px] bg-gray-200/[.7]"
  )
    NuxtLink(to="/bible" active-class="text-blue-600").flex-cc.flex-col
      .i-carbon-book.text-4xl
      .text-xs.uppercase bible
    NuxtLink(to="/books" active-class="text-blue-600").flex-cc.flex-col
      .i-carbon-light.text-4xl
      .text-xs.uppercase books
    NuxtLink(to="/")
      .i-icon-logo.text-5xl
    NuxtLink(to="/music" active-class="text-blue-600").flex-cc.flex-col
      .i-carbon-music.text-4xl
      .text-xs.uppercase music
    NuxtLink(to="/user" active-class="text-blue-600").flex-cc.flex-col
      .i-carbon-user-settings.text-4xl
      .text-xs.uppercase setting
  //- .w-full.overflow-y-scroll.custom-noscrollbar(class="h-[calc(100vh-72px)]")
  .w-full.h72px
</template>
