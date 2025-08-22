export const useIndexStore = defineStore('auth', () => {
  const { decryptData } = useCrypto()
  const { createTailwindVariables } = useTheme()

  // Persisted encrypted app config in local storage
  const savedEncryptedAppConfig = 
    useLocalStorage<string | null>(ERP_STORAGE_KEYS.APP_CONFIG, null)

  const decryptedAppConfig = computed<ErpAppConfig | null>(() => {
    return savedEncryptedAppConfig 
      ? decryptData(savedEncryptedAppConfig.value)
      : null 
  })

  const app = reactive({
    theme: {
      primaryColor: {
        default: DEFAULT_PRIMARY_COLOR,

        tailwindVariables: computed(() => {
          const primaryColor = decryptedAppConfig.value?.primaryColor || DEFAULT_PRIMARY_COLOR;
          return createTailwindVariables(primaryColor);
        })
      }
      
    }
  })

  return {
    app, decryptedAppConfig, savedEncryptedAppConfig
  }
})

// HMR (Hot Module Replacement) support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIndexStore, import.meta.hot))
}
