<script setup lang="ts">
definePageMeta({
  layout: 'app',
})
</script>

<template lang="pug">
.p-5
  NuxtLink(to="/chat").text-base.flex-cy.gap-1
    .i-carbon-chat.text-3xl
    span to chat
</template>
