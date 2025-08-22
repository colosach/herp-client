<script lang="ts" setup>
  const indexStore = useIndexStore()
  const { encryptData } = useCrypto()

  function change() {
    let config = {
      primaryColor: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
    }

    updateStorage(ERP_STORAGE_KEYS.APP_CONFIG, encryptData(config))
  }
</script>

<template>
  <section class="erp__setup__formBox w-full">
    <button
      class="p-2 rounded-lg bg-white text-black cursor-pointer"
      @click="change"
    >
      Change
    </button>

    <button
      class="p-2 rounded-lg bg-primary text-black cursor-pointer"
      @click=""
    >
      Reset
    </button>
  </section>
</template>