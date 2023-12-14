<template>
  <div fixed bottom-0 h72px w-full flex-bc px3 text-4xl class="bg-gray-50/[.7] backdrop-blur-[3px]">
    <NuxtLink to="/" active-class="text-blue600" replace flex-cc flex-1 flex-col>
      <span i-carbon-chat text-4xl />
      <span text-xs uppercase> 消息 </span>
    </NuxtLink>
    <NuxtLink to="/user" active-class="text-blue600" replace flex-cc flex-1 flex-col>
      <span i-carbon-user-settings text-4xl />
      <span text-xs uppercase> 我的 </span>
    </NuxtLink>
  </div>
</template>
