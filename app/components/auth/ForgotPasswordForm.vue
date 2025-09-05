<script setup lang="ts">
  const { form, schema, state, initPasswordReset } = useForgotPassword()
</script>

<template>
  <UForm
    :schema="schema" :state="state" 
    id="forgot-password-form" ref="forgot-password-form"
    class="erp__forgotPswdForm space-y-4 w-full max-w-[30rem]"
    :validate-on="['blur']"
    @submit="initPasswordReset"
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
          <h1 class="erp__forgotPswdForm__title text-2xl text-highlighted"> {{  $t('FORGOT_PASSWORD.title') }}</h1>
          <p class="erp__forgotPswdForm__subtitle text-base text-muted"> {{  $t('FORGOT_PASSWORD.subtitle') }} </p>
        </div>
      </template>

      <!-- Form body -->
      <template #default>
        <UFormField 
          :label="$t('LOGIN.inputs.id.label')" 
          :required="true" name="email"  size="xl"
        > 
          <UInput 
            v-model="state.email" 
            class="erp__forgotPswdForm__email w-full" type="email"
            :placeholder="$t('FORGOT_PASSWORD.inputs.password.placeholder')"
            :ui="{ base: 'text-ellipsis' }"
            required
          />
        </UFormField>
      </template>

      <!-- Form footer/actions -->
      <template #footer>
        <div class="erp__forgotPswdForm__actions flex items-center justify-between gap-1 text-base">
          <UButton
          variant="link"
            :to="{ name: 'auth-login' }"
            class="erp__forgotPswdForm__rPsswdBtn undl-text text-muted hover:text-white p-0 text-base"
          >
          {{ $t('FORGOT_PASSWORD.actions.login') }}
            <span></span>
          </UButton>

          <UButton
            type="submit" size="xl"
            class="erp__forgotPswdForm__submitBtn cursor-pointer ph-bold"
            :loading-auto="true"
            loading-icon="ph-spinner"
          >
            {{ $t('FORGOT_PASSWORD.actions.sendCode') }}
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