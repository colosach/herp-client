<script setup lang="ts">
  const { form, schema, state, initLogin } = useLogin()
  const pswdIsShown = ref(false)
</script>

<template>
  <UForm
    :schema="schema" :state="state" 
    id="login-form" ref="login-form"
    class="space-y-4 w-full max-w-[25rem]"
    :validate-on="['change']"
    @submit="initLogin"
  >
    <UCard 
      :ui="{
        root: 'rounded-3xl divide-none p-0 shadow-sm',
        header: 'sm:px-4 px-4',
        body: 'sm:px-4 px-4 pt-0',
        footer: 'sm:px-4 px-4 py-[1.375rem] pt- [background:linear-gradient(0deg,var(--ui-bg-elevated)_0%,var(--ui-bg-elevated)_100%),var(--ui-bg)]',
      }"
    >

      <!-- Form head -->
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl text-highlighted"> {{  $t('LOGIN.title') }} </h1>
          <p class="text-base text-muted"> {{  $t('LOGIN.subtitle') }} </p>
        </div>
      </template>

      <!-- Form body -->
      <template class="" #default>
        <div class="space-y-4">
          <UFormField 
            :label="$t('LOGIN.inputs.username.label')" 
            :required="true" name="id"  size="sm"
          >
            <UInput 
              v-model="state.id" 
              class="w-full" type="text"
              :placeholder="$t('LOGIN.inputs.username.placeholder')"
              :ui="{ base: 'text-ellipsis' }"
            />
          </UFormField>

          <UFormField
            :label="$t('LOGIN.inputs.password.label')"
            :required="true" name="password" size="sm"
          >
            <UInput
              class="w-full" 
              v-model="state.password"
              :type="pswdIsShown ? 'text' : 'password'"
              :placeholder="$t('LOGIN.inputs.password.placeholder')"
              :ui="{ base: 'text-ellipsis', trailing: 'pe-1' }"
            >
            <template #trailing>
              <UButton
                color="neutral" variant="link"
                size="sm" class="cursor-pointer text-dimmed"
                :icon="pswdIsShown ? 'i-ph-eye-slash' : 'i-ph-eye'"
                :aria-label="pswdIsShown ? 'Hide password' : 'Show password'"
                :aria-pressed="pswdIsShown"
                aria-controls="password"
                @click="pswdIsShown = !pswdIsShown"
              />
            </template>
            </UInput>
          </UFormField>

          <p class="text-xs text-muted">
            {{ $t('LOGIN.addonText.chunk1') }} 

            <NuxtLink to="" class="text-highlighted italic underline">
              {{ $t('LOGIN.addonText.terms') }}  
            </NuxtLink>

            {{ $t('LOGIN.addonText.chunk2') }}

            <NuxtLink to="" class="text-highlighted italic underline">
              {{ $t('LOGIN.addonText.privacy') }} 
            </NuxtLink>.
          </p>
        </div>
      </template>

      <!-- Form footer/actions -->
      <template class="sdfsd" #footer>
        <div class="flex items-center justify-between gap-1">

          <RouterLink
            :to="{ name: 'auth-reset-password' }"
            class="text-sm text-muted"
          >
            {{ $t('LOGIN.actions.resetPassword') }}
          </RouterLink>

          <UButton
            type="submit" size="md"
            class="cursor-pointer"
          >
            Submit
          </UButton>
        </div>
      </template>

    </UCard>
  </UForm>
</template>

<style>
  /* Hide the password reveal button in Edge */
  ::-ms-reveal {
      display: none;
  }
</style>