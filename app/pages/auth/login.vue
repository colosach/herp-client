<script setup lang="ts">
  definePageMeta({
    layout: 'erp-auth-layout'
  })
</script>

<template>
  <main
    class="
      erp__login__page margin h-full min-h-full w-full 
      flex items-center justify-center
    "
  >
    <LoginForm />
  </main>
</template>