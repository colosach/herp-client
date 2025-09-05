<script setup lang="ts">
  const { 
    form, schema, state, initRegisteration,
    color, text, strength, score
  } = useRegistration()

  const pswdIsShown = ref(false)
  const pswd2IsShown = ref(false)
  const passwordStrengthCheckerIsShown = ref(false)
</script>

<template>
  <UForm
    :schema="schema" :state="state" 
    id="register-form" ref="register-form"
    class="erp__registrationForm space-y-4 w-full max-w-[30rem]"
    :validate-on="['blur']"
    @submit="initRegisteration"
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
          <h1 class="erp__registrationForm__title text-2xl text-highlighted"> {{  $t('REGISTER.title') }}</h1>
          <p class="erp__registrationForm__subtitle text-base text-muted"> {{  $t('REGISTER.subtitle') }} </p>
        </div>
      </template>

      <!-- Form body -->
      <template #default>
        <div class="flex flex-col gap-4">
          <UFormField 
            :label="$t('REGISTER.inputs.firstName.label')" 
            :required="true" name="first_name"  size="xl"
          > 
            <UInput 
              v-model.trim="state.first_name" type="text"
              class="erp__registrationForm__firstName w-full" 
              :placeholder="$t('REGISTER.inputs.firstName.placeholder')"
              :ui="{ base: 'text-ellipsis' }"
              required
            />
          </UFormField>

          <UFormField 
            :label="$t('REGISTER.inputs.lastName.label')" 
            :required="true" name="last_name" size="xl"
          > 
            <UInput 
              v-model.trim="state.last_name" type="text"
              class="erp__registrationForm__lastName w-full" 
              :placeholder="$t('REGISTER.inputs.lastName.placeholder')"
              :ui="{ base: 'text-ellipsis' }"
              required
            />
          </UFormField>

          <UFormField 
            :label="$t('REGISTER.inputs.email.label')" 
            :required="true" name="email" size="xl"
          > 
            <UInput 
              v-model.trim="state.email" type="email"
              class="erp__registrationForm__email w-full" 
              :placeholder="$t('REGISTER.inputs.email.placeholder')"
              :ui="{ base: 'text-ellipsis' }"
              required
            />
          </UFormField>

          <UFormField 
            :label="$t('REGISTER.inputs.password.label')" 
            :required="true" name="password" size="xl"
            aria-autocomplete="none"
          > 
            <UInput 
              v-model.trim="state.password" 
              :type="pswdIsShown ? 'text' : 'password'"
              class="erp__registrationForm__password w-full" 
              :color="color"
              :placeholder="$t('REGISTER.inputs.password.placeholder')"
              :ui="{ base: 'text-ellipsis', trailing: 'pe-1' }"
              :aria-invalid="score < 4"
              aria-describedby="password-strength"
              required
              @focus="passwordStrengthCheckerIsShown = true"
              @blur="passwordStrengthCheckerIsShown = false"
              autocomplete="false"
              aria-autocomplete="none"
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

          <UCollapsible
            v-model:open="passwordStrengthCheckerIsShown"
            class="flex flex-col gap-2 w-full"
          >
            <template #content>
              <div class="flex flex-col gap-2">

                <UProgress
                  :color="color"
                  :indicator="text"
                  :model-value="score"
                  :max="4"
                  size="sm"
                />

                <ul
                  class="grid grid-cols-2 gap-y-1"
                  aria-label="Password requirements"
                >
                  <li
                    v-for="(req, index) in strength" :key="index"
                    class="flex items-center gap-0.5"
                    :class="req.met ? 'text-primary' : 'text-muted'"
                  >
                    <UIcon
                      :name="req.met ? 'ph-check' : 'ph-x'"
                      class="size-4 shrink-0"
                    />

                    <span class="text-xs">
                      {{ req.text }}
                    </span>
                  </li>
                </ul>

              </div>
            </template>
          </UCollapsible>

          <UFormField 
            :label="$t('REGISTER.inputs.password2.label')" class="-mt-4"
            :class="{'-mt-0': passwordStrengthCheckerIsShown }"
            :required="true" name="password2" size="xl"
            aria-autocomplete="none"
          > 
            <UInput 
              v-model.trim="state.password2" 
              :type="pswd2IsShown ? 'text' : 'password'"
              class="erp__registrationForm__password2 w-full" 
              :placeholder="$t('REGISTER.inputs.password2.placeholder')"
              :ui="{ base: 'text-ellipsis', trailing: 'pe-1' }"
              autocomplete="false"
              aria-autocomplete="none"
              required
            >
              <template #trailing>
                <UButton
                  color="neutral" variant="link" size="sm"
                  class="cursor-pointer text-dimmed ph-bold"
                  :icon="pswd2IsShown ? 'i-ph-eye-slash' : 'i-ph-eye'"
                  :aria-label="pswd2IsShown ? 'Hide password' : 'Show password'"
                  :aria-pressed="pswd2IsShown"
                  aria-controls="password"
                  @click="pswd2IsShown = !pswd2IsShown"
                />
              </template>
            </UInput>
          </UFormField>

          <p class="erp__loginForm__disclaimer text-base text-muted mt-2">
            {{ $t('REGISTER.addonText.chunk1') }}

            <NuxtLink to="" class="text-highlighted italic underline">
              {{ $t('REGISTER.addonText.terms') }}
            </NuxtLink>

            {{ $t('REGISTER.addonText.chunk2') }}

            <NuxtLink to="" class="text-highlighted italic underline inline">
              {{ $t('REGISTER.addonText.privacy') }}
            </NuxtLink>.
          </p>
        </div>
      </template>

      <!-- Form footer/actions -->
      <template #footer>
        <div class="erp__registrationForm__actions flex items-center justify-between gap-1 text-base">
          <UButton
            variant="link"
            :to="{ name: 'auth-login' }"
            class="erp__registrationForm__loginBtn undl-text text-muted hover:text-white text-base p-0"
          >
            {{ $t('REGISTER.actions.loginInstead') }}
            <span></span>
          </UButton>

          <UButton
            type="submit" size="xl"
            class="erp__registrationForm__submitBtn cursor-pointer ph-bold"
            :loading-auto="true"
            loading-icon="ph-spinner"
          >
            {{ $t('REGISTER.actions.register') }}
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