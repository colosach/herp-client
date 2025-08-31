<script setup lang="ts">
  const { form, schema, state, initLogin } = useLogin()
  const pswdIsShown = ref(false)
</script>

<template>
  <UForm
    :schema="schema" :state="state" 
    id="login-form" ref="login-form"
    class="erp__loginForm space-y-4 w-full max-w-[30rem]"
    :validate-on="['blur']"
    @submit="initLogin"
  >
    <UCard 
      :ui="{
        root: 'divide-none rounded-3xl',
        header: 'sm:px-6 px-6 pt-6',
        body: 'sm:px-6 px-6 pt-0',
        footer: 'sm:px-6 px-6 py-6 bg-accented',
      }"
    >

      <!-- Form head -->
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="erp__loginForm__title text-2xl text-highlighted"> {{  $t('LOGIN.title') }}</h1>
          <p class="erp__loginForm__subtitle text-base text-muted"> {{  $t('LOGIN.subtitle') }} </p>
        </div>
      </template>

      <!-- Form body -->
      <template #default>
        <div class="flex flex-col gap-4">
          <UFormField 
            :label="$t('LOGIN.inputs.id.label')" 
            :required="true" name="id"  size="xl"
          > 
            <UInput 
              v-model="state.id" 
              class="erp__loginForm__id w-full" type="text"
              :placeholder="$t('LOGIN.inputs.id.placeholder')"
              :ui="{ base: 'text-ellipsis' }"
              required
            />
          </UFormField>

          <UFormField
            :label="$t('LOGIN.inputs.password.label')"
            :required="true" name="password" size="xl"
          >
            <UInput
              class="erp__loginForm__password w-full" 
              v-model="state.password"
              :type="pswdIsShown ? 'text' : 'password'"
              :placeholder="$t('LOGIN.inputs.password.placeholder')"
              :ui="{ base: 'text-ellipsis', trailing: 'pe-1' }"
              required
            >
            <template #trailing>
              <UButton
                color="neutral" variant="link" size="sm"
                class="cursor-pointer text-dimmed ph-bol"
                :icon="pswdIsShown ? 'i-ph-eye-slash' : 'i-ph-eye'"
                :aria-label="pswdIsShown ? 'Hide password' : 'Show password'"
                :aria-pressed="pswdIsShown"
                aria-controls="password"
                @click="pswdIsShown = !pswdIsShown"
              />
            </template>
            </UInput>
          </UFormField>

          <p class="erp__loginForm__disclaimer text-base text-muted mt-2">
            {{ $t('LOGIN.addonText.chunk1') }} 

            <NuxtLink to="" class="text-highlighted italic underline">
              {{ $t('LOGIN.addonText.terms') }}  
            </NuxtLink>

            {{ $t('LOGIN.addonText.chunk2') }}

            <NuxtLink to="" class="text-highlighted italic underline inline">
              {{ $t('LOGIN.addonText.privacy') }} 
            </NuxtLink>.
          </p>
        </div>
      </template>

      <!-- Form footer/actions -->
      <template #footer>
        <div class="erp__loginForm__actions flex items-center justify-between gap-1 text-base">

          <RouterLink
            :to="{ name: 'auth-reset-password' }"
            class="erp__loginForm__rPsswdBtn text-muted"
          >
            {{ $t('LOGIN.actions.resetPassword') }}
          </RouterLink>

          <UButton
            type="submit" size="xl"
            class="erp__loginForm__submitBtn cursor-pointer ph-bold"
            :loading-auto="true"
            loading-icon="ph-spinner"
          >
            {{ $t('LOGIN.actions.login') }}
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