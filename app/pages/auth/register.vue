<script setup lang="ts">
  definePageMeta({
    layout: 'erp-auth-layout',
    requiresGuest: true
  })
</script>

<template>
  <main
    class="
      erp__registeration__page margin h-full min-h-full w-full 
      flex items-center justify-center
    "
  >
    <RegistrationForm />
  </main>
</template>